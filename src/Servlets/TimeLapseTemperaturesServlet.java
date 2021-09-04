package Servlets;

import org.json.JSONArray;
import org.json.JSONObject;
import org.rythmengine.Rythm;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Random;

public class TimeLapseTemperaturesServlet extends HttpServlet {

    /**
     * Sends the JSON file with the time lapse temperatures
     * @param req the client request
     * @param resp the server response
     * @throws ServletException
     * @throws IOException
     */

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int samples = Integer.parseInt(req.getParameter("samples"));
        String startDateTime = req.getParameter("startDateTime");
        String endDateTime = req.getParameter("endDateTime");
        try {
            resp.getWriter().write(getTimeLapseTemperaturesJSON(getNumSamples(samples,startDateTime,endDateTime)));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    /**
     * creates the JSON string with the time lapse temperatures
     * @param numSamples the number of samples
     * @return the JSON string
     */

    private String getTimeLapseTemperaturesJSON(int numSamples){
        JSONObject jTemperatures = new JSONObject(Rythm.render(Path.jTemperatures));
        JSONArray jTemperaturesArray = jTemperatures.getJSONArray("temperatures");
        for (int i = 0; i < jTemperaturesArray.length(); i++) {
            for(int j=0; j<numSamples; j++){
                JSONArray temperaturesInterval = jTemperaturesArray.getJSONObject(i).getJSONArray("temperatures_interval");
                int temperature = getRandomInt(temperaturesInterval.getInt(0), temperaturesInterval.getInt(1));
                jTemperaturesArray.getJSONObject(i).getJSONArray("time_lapse_temperatures").put(j,temperature);
            }
        }
        return jTemperatures.toString();
    }


    /**
     * calculate the number of samples to sends to the client
     * @param samples the samples size
     * @param startDateTime the start date
     * @param endDateTime the end date
     * @return the number of samples
     * @throws ParseException
     */

    private int getNumSamples(int samples, String startDateTime, String endDateTime) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        long startMillis = format.parse(startDateTime.replace("T"," ")).getTime();
        long endMillis = format.parse(endDateTime.replace("T", " ")).getTime();
        int numSamples=0;
        while(endMillis>=startMillis){
            startMillis += samples*600000;
            numSamples++;
        }
        return numSamples;
    }

    /**
     * returns a random value within a certain range
     * @param min the min value
     * @param max the max value
     * @return the random value
     */

    private int getRandomInt(int min, int max){
        Random random = new Random();
        return random.nextInt(((max-min) + 1)) + min;
    }

}
