package com.example.teambudgetbackend;
import org.h2.server.web.WebServer;

public class EncodePassword {
    public static void main(String[] args) {
        System.out.println(WebServer.encodeAdminPassword("adminpassword123"));
    }
}
