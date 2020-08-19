import Servlets.AnnotationsServlet;
import Servlets.Path;
import Servlets.WelcomeServlet;
import org.json.JSONArray;
import org.json.JSONObject;
import org.rythmengine.Rythm;

public class Main {
    public static void main(String[] argv) throws Exception {
        new ApplicationServer(8081, new WelcomeServlet(), new AnnotationsServlet()).start();


    }
}