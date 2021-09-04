package Servlets;

import org.json.JSONObject;
import org.rythmengine.Rythm;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AnnotationsServlet extends HttpServlet {

    /**
     * Sends the JSON file with the annotations
     * @param req   The client request
     * @param resp  The server response
     * @throws ServletException
     * @throws IOException
     */

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.getWriter().write(getPreprocessedJSON());
    }

    /**
     * This method preprocesses the JSON file to be sent to the client.
     * Changes the file image's name by entering the path so that the client can request it.
     * Inserts the temperatures of the rooms inside the JSON file to send.
     * @return the preprocessed JSON string
     */

    private String getPreprocessedJSON() {
        JSONObject jDefault = new JSONObject(Rythm.render(Path.jAnnotations));
        jDefault.getJSONArray("images").getJSONObject(0).put("file_name", Path.image);
        return jDefault.toString();
    }

}