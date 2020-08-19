import javax.servlet.Servlet;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class ApplicationServer {

    private int port;
    private Servlet welcomeServlet;
    private Servlet annotationsServlet;
    private Server server;

    public ApplicationServer(int port, Servlet welcomeServlet, Servlet annotationsServlet ) {
        this.port = port;
        this.welcomeServlet = welcomeServlet;
        this.annotationsServlet = annotationsServlet;
    }

    public void start() throws Exception {
        server = new Server(port);
        ServletContextHandler handler = new ServletContextHandler();
        handler.addServlet(new ServletHolder(welcomeServlet), "/index");
        handler.addServlet(new ServletHolder(annotationsServlet), "/annotations");
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
