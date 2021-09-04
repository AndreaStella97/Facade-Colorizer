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

public class RealTimeTemperaturesServlet extends HttpServlet {


    /**
     * Sends the JSON file with the real time temperatures
     * @param req the client request
     * @param resp the server response
     * @throws ServletException
     * @throws IOException
     */

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write(getTemperaturesJSON());
    }



    /**
     * creates the JSON string with the real time temperatures
     * @return the JSON string
     */

    private String getTemperaturesJSON() {
        JSONObject jTemperatures = new JSONObject(Rythm.render(Path.jTemperatures));
        JSONArray jTemperaturesArray = jTemperatures.getJSONArray("temperatures");
        for (int i = 0; i < jTemperaturesArray.length(); i++) {
            JSONArray temperaturesInterval = jTemperaturesArray.getJSONObject(i).getJSONArray("temperatures_interval");
            int temperature = getRandomInt(temperaturesInterval.getInt(0), temperaturesInterval.getInt(1));
            jTemperaturesArray.getJSONObject(i).put("temperature", temperature);
        }
        return jTemperatures.toString();
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
