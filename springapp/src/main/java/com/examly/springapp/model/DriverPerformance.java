package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "Driver_Performance")
public class DriverPerformance {

    public enum DriverStatus { ACTIVE, INACTIVE, SUSPENDED, BANNED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User driver;

    @Column(columnDefinition = "int default 0")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int totalRides = 0;

    @Column(columnDefinition = "int default 0")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int completedRides = 0;

    @Column(columnDefinition = "int default 0")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int cancelledRides = 0;

    @Column(precision = 3, scale = 2)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private BigDecimal averageRating = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private BigDecimal totalEarnings = BigDecimal.ZERO;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp lastActiveDate;

    @Column(columnDefinition = "int default 0")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int performanceScore = 0;

    @Enumerated(EnumType.STRING)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private DriverStatus status = DriverStatus.INACTIVE;

    public DriverPerformance() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public User getDriver() { return driver; }
    public void setDriver(User driver) { this.driver = driver; }
    public int getTotalRides() { return totalRides; }
    public void setTotalRides(int totalRides) { this.totalRides = totalRides; }
    public int getCompletedRides() { return completedRides; }
    public void setCompletedRides(int completedRides) { this.completedRides = completedRides; }
    public int getCancelledRides() { return cancelledRides; }
    public void setCancelledRides(int cancelledRides) { this.cancelledRides = cancelledRides; }
    public BigDecimal getAverageRating() { return averageRating; }
    public void setAverageRating(BigDecimal averageRating) { this.averageRating = averageRating; }
    public BigDecimal getTotalEarnings() { return totalEarnings; }
    public void setTotalEarnings(BigDecimal totalEarnings) { this.totalEarnings = totalEarnings; }
    public Timestamp getLastActiveDate() { return lastActiveDate; }
    public void setLastActiveDate(Timestamp lastActiveDate) { this.lastActiveDate = lastActiveDate; }
    public int getPerformanceScore() { return performanceScore; }
    public void setPerformanceScore(int performanceScore) { this.performanceScore = performanceScore; }
    public DriverStatus getStatus() { return status; }
    public void setStatus(DriverStatus status) { this.status = status; }
}
