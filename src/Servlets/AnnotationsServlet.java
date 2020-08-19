package Servlets;


import org.json.JSONArray;
import org.json.JSONObject;
import org.rythmengine.Rythm;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class AnnotationsServlet extends HttpServlet {

    private static String jsonCategoryRoomsName = "Camere";
    private static String jsonRoomId = "ID";

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
        JSONObject jDefault = new JSONObject(Rythm.render(Path.jDefault));
        jDefault.getJSONArray("images").getJSONObject(0).put("file_name", Path.image);
        JSONArray jAnnotations = jDefault.getJSONArray("annotations");
        JSONArray jRooms = new JSONObject(Rythm.render(Path.jTemperatures)).getJSONArray("thermostats");
        JSONArray jCategories = jDefault.getJSONArray("categories");
        int cameraCategoryId = 0;
        for (int i = 0; i < jCategories.length(); i++) {
            if (jCategories.getJSONObject(i).getString("name").equals(jsonCategoryRoomsName)) {
                cameraCategoryId = jCategories.getJSONObject(i).getInt("id");
            }

        }
        for (int i = 0; i < jAnnotations.length(); i++) {
            for (int j = 0; j < jRooms.length(); j++) {
                int tempId = jRooms.getJSONObject(j).getInt("room_id");
                int roomId = jAnnotations.getJSONObject(i).getJSONObject("attributes").getInt(jsonRoomId);
                int categoryId = jAnnotations.getJSONObject(i).getInt("category_id");
                if (tempId == roomId && categoryId == cameraCategoryId) {
                    jAnnotations.getJSONObject(i).put("temperatures", jRooms.getJSONObject(j).getJSONArray("temperatures"));
                }
            }
        }
        return jDefault.toString();
    }




}