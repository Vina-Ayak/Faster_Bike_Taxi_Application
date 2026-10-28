package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Background_Checks")
public class BackgroundCheck {

    public enum CheckStatus { INITIATED, IN_PROGRESS, COMPLETED, FAILED }
    public enum CheckResult { CLEAR, FLAGGED, REJECTED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Biketaxi application;

    @Column(nullable = false, length = 100)
    private String checkType;

    @Column(nullable = false, length = 100)
    private String verificationAgency;

    @Enumerated(EnumType.STRING)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private CheckStatus status = CheckStatus.INITIATED;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp initiatedDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp completionDate;

    @Enumerated(EnumType.STRING)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private CheckResult result;

    @Column(columnDefinition = "TEXT")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String remarks;

    public BackgroundCheck() {}

    @PrePersist
    protected void onCreate() {
        initiatedDate = new Timestamp(System.currentTimeMillis());
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public Biketaxi getApplication() { return application; }
    public void setApplication(Biketaxi application) { this.application = application; }
    public String getCheckType() { return checkType; }
    public void setCheckType(String checkType) { this.checkType = checkType; }
    public String getVerificationAgency() { return verificationAgency; }
    public void setVerificationAgency(String verificationAgency) { this.verificationAgency = verificationAgency; }
    public CheckStatus getStatus() { return status; }
    public void setStatus(CheckStatus status) { this.status = status; }
    public Timestamp getInitiatedDate() { return initiatedDate; }
    public void setInitiatedDate(Timestamp initiatedDate) { this.initiatedDate = initiatedDate; }
    public Timestamp getCompletionDate() { return completionDate; }
    public void setCompletionDate(Timestamp completionDate) { this.completionDate = completionDate; }
    public CheckResult getResult() { return result; }
    public void setResult(CheckResult result) { this.result = result; }
    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
