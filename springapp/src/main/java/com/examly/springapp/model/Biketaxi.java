package com.examly.springapp.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Driver_Applications")
public class Biketaxi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(unique = true, nullable = false, length = 20)
    private String bikeNumber;

    @Column(nullable = false)
    private int age;

    @Column(nullable = false, length = 15)
    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(length = 100)
    private String emergencyContact;

    @Column(unique = true, length = 50)
    private String drivingLicenseNumber;

    @Enumerated(EnumType.STRING)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private DriverApplicationStatus status = DriverApplicationStatus.DRAFT;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp submissionDate;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp lastModified;

    public Biketaxi() {
    }

    @PrePersist
    protected void onCreate() {
        submissionDate = Timestamp.from(Instant.now());
        lastModified = submissionDate;
    }

    @PreUpdate
    protected void onUpdate() {
        lastModified = Timestamp.from(Instant.now());
    }

    // Original Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getBikeNumber() { return bikeNumber; }
    public void setBikeNumber(String bikeNumber) { this.bikeNumber = bikeNumber; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    // New Getters and Setters
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
    public String getDrivingLicenseNumber() { return drivingLicenseNumber; }
    public void setDrivingLicenseNumber(String drivingLicenseNumber) { this.drivingLicenseNumber = drivingLicenseNumber; }
    public DriverApplicationStatus getStatus() { return status; }
    public void setStatus(DriverApplicationStatus status) { this.status = status; }
    public Timestamp getSubmissionDate() { return submissionDate; }
    public void setSubmissionDate(Timestamp submissionDate) { this.submissionDate = submissionDate; }
    public Timestamp getLastModified() { return lastModified; }
    public void setLastModified(Timestamp lastModified) { this.lastModified = lastModified; }
}
