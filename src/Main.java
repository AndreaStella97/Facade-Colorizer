import Servlets.AnnotationsServlet;
import Servlets.RealTimeTemperaturesServlet;
import Servlets.TimeLapseTemperaturesServlet;
import Servlets.WelcomeServlet;


public class Main {
    public static void main(String[] argv) throws Exception {
         new ApplicationServer(8080, new WelcomeServlet(), new AnnotationsServlet(), new RealTimeTemperaturesServlet(), new TimeLapseTemperaturesServlet()).start();
    }
}