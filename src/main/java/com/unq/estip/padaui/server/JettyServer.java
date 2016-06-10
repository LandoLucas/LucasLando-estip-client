package com.unq.estip.padaui.server;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class JettyServer {

	 public static void main(String[] args) throws Exception{
    	 String portStr = System.getenv("PORT");
         int port = (portStr == null) ? 8085 : Integer.parseInt(portStr);
         Server server = new Server(port);
         WebAppContext webapp = new WebAppContext();
         webapp.setContextPath("/");
         // change the name of the war as needed.
         webapp.setWar("target/classes/pada-client.war");
         server.setHandler(webapp);

         server.start();
         server.join();
    }
	
}
