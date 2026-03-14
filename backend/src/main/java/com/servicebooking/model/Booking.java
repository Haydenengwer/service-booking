package com.servicebooking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;
    private String issueDescription;
    private String name;
    private String zipCode;
    private String email;
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Booking() {}

    public Long getId() { return id; }
    public String getServiceName() { return serviceName; }
    public String getIssueDescription() { return issueDescription; }
    public String getName() { return name; }
    public String getZipCode() { return zipCode; }
    public String getEmail() { return email; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setServiceName(String serviceName) { this.serviceName = serviceName; }
    public void setIssueDescription(String issueDescription) { this.issueDescription = issueDescription; }
    public void setName(String name) { this.name = name; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
    public void setEmail(String email) { this.email = email; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
