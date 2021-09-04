import javax.servlet.Servlet;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class ApplicationServer {

    private int port;
    private Servlet welcomeServlet;
    private Servlet annotationsServlet;
    private Servlet realTimeTemperaturesServlet;
    private Servlet timeLapseTemperaturesServlet;
    private Server server;

    public ApplicationServer(int port, Servlet welcomeServlet, Servlet annotationsServlet, Servlet realTimeTemperaturesServlet, Servlet timeLapseTemperaturesServlet) {
        this.port = port;
        this.welcomeServlet = welcomeServlet;
        this.annotationsServlet = annotationsServlet;
        this.realTimeTemperaturesServlet = realTimeTemperaturesServlet;
        this.timeLapseTemperaturesServlet = timeLapseTemperaturesServlet;
    }

    public void start() throws Exception {
        server = new Server(port);
        ServletContextHandler handler = new ServletContextHandler();
        handler.addServlet(new ServletHolder(welcomeServlet), "/index");
        handler.addServlet(new ServletHolder(annotationsServlet), "/annotations");
        handler.addServlet(new ServletHolder(realTimeTemperaturesServlet), "/values/last");
        handler.addServlet(new ServletHolder(timeLapseTemperaturesServlet), "/values/frames");

        addStaticFileServing(handler);
        server.setHandler(handler);
        server.start();
    }

    public void stop() throws Exception {
        server.stop();
    }


    private void addStaticFileServing(ServletContextHandler handler) {
        ServletHolder holderPwd = new ServletHolder("default", new DefaultServlet());
        holderPwd.setInitParameter("resourceBase", "./");
        holderPwd.setInitParameter("dirAllowed","false");
        holderPwd.setInitParameter("pathInfoOnly","true");
        handler.addServlet(holderPwd, "/*");
    }

}
