package com.examly.springapp.model;

import jakarta.persistence.*;
import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Vehicles")
public class Vehicle {

    public enum VehicleCondition {
        EXCELLENT, GOOD, FAIR, NEEDS_REPAIR
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Biketaxi application;

    @Column(unique = true, nullable = false, length = 20)
    private String registrationNumber;

    @Column(nullable = false, length = 50)
    private String make;

    @Column(nullable = false, length = 50)
    private String model;

    @Column(nullable = false)
    private int yearOfManufacture;

    @Column(nullable = false, length = 50)
    private String insurancePolicyNumber;

    @Column(nullable = false)
    private Date insuranceExpiryDate;

    @Column(length = 50)
    private String pollutionCertificateNumber;

    private Date pollutionCertificateExpiry;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date lastInspectionDate;

    @Enumerated(EnumType.STRING)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private VehicleCondition vehicleCondition;

    public Vehicle() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Biketaxi getApplication() { return application; }
    public void setApplication(Biketaxi application) { this.application = application; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public int getYearOfManufacture() { return yearOfManufacture; }
    public void setYearOfManufacture(int yearOfManufacture) { this.yearOfManufacture = yearOfManufacture; }

    public String getInsurancePolicyNumber() { return insurancePolicyNumber; }
    public void setInsurancePolicyNumber(String insurancePolicyNumber) { this.insurancePolicyNumber = insurancePolicyNumber; }

    public Date getInsuranceExpiryDate() { return insuranceExpiryDate; }
    public void setInsuranceExpiryDate(Date insuranceExpiryDate) { this.insuranceExpiryDate = insuranceExpiryDate; }

    public String getPollutionCertificateNumber() { return pollutionCertificateNumber; }
    public void setPollutionCertificateNumber(String pollutionCertificateNumber) { this.pollutionCertificateNumber = pollutionCertificateNumber; }

    public Date getPollutionCertificateExpiry() { return pollutionCertificateExpiry; }
    public void setPollutionCertificateExpiry(Date pollutionCertificateExpiry) { this.pollutionCertificateExpiry = pollutionCertificateExpiry; }

    public Date getLastInspectionDate() { return lastInspectionDate; }
    public void setLastInspectionDate(Date lastInspectionDate) { this.lastInspectionDate = lastInspectionDate; }

    public VehicleCondition getVehicleCondition() { return vehicleCondition; }
    public void setVehicleCondition(VehicleCondition vehicleCondition) { this.vehicleCondition = vehicleCondition; }
}
