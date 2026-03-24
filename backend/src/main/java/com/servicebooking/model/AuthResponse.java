package com.servicebooking.model;

public class AuthResponse {
    private String token;
    private String name;
    private String email;
    private String phone;

    public AuthResponse(String token, String name, String email, String phone) {
        this.token = token;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public String getToken() { return token; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
}
