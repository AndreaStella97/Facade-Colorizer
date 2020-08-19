package Servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.rythmengine.Rythm;


public class WelcomeServlet extends HttpServlet {

    /**
     * Sends the html index page
     * @param req   The client request
     * @param resp  The server response
     * @throws ServletException
     * @throws IOException
     */


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.getWriter().write(Rythm.render(Path.index));

    }

}