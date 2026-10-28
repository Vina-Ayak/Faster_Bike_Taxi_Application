package com.examly.springapp.model;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.sql.Date;
import java.time.Instant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "Documents")
public class Document {

    public enum DocumentType {
        DRIVING_LICENSE, VEHICLE_REGISTRATION, INSURANCE, POLLUTION_CERTIFICATE, PHOTO, AADHAR, PAN
    }

    public enum VerificationStatus {
        PENDING, VERIFIED, REJECTED, EXPIRED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    @JsonIgnore
    private Biketaxi application;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType documentType;

    @Column(nullable = false, length = 255)
    private String fileName;

    @Column(nullable = false)
    private long fileSize;

    @Column(nullable = false, length = 500)
    private String filePath;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp uploadDate;

    @Enumerated(EnumType.STRING)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "verified_by")
    @JsonIgnore
    private User verifiedBy;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp verificationDate;

    private Date expiryDate;

    public Document() {}

    @PrePersist
    protected void onCreate() {
        uploadDate = Timestamp.from(Instant.now());
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Biketaxi getApplication() { return application; }
    public void setApplication(Biketaxi application) { this.application = application; }

    public DocumentType getDocumentType() { return documentType; }
    public void setDocumentType(DocumentType documentType) { this.documentType = documentType; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public long getFileSize() { return fileSize; }
    public void setFileSize(long fileSize) { this.fileSize = fileSize; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Timestamp getUploadDate() { return uploadDate; }
    public void setUploadDate(Timestamp uploadDate) { this.uploadDate = uploadDate; }

    public VerificationStatus getVerificationStatus() { return verificationStatus; }
    public void setVerificationStatus(VerificationStatus verificationStatus) { this.verificationStatus = verificationStatus; }

    public User getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(User verifiedBy) { this.verifiedBy = verifiedBy; }

    public Timestamp getVerificationDate() { return verificationDate; }
    public void setVerificationDate(Timestamp verificationDate) { this.verificationDate = verificationDate; }

    public Date getExpiryDate() { return expiryDate; }
    public void setExpiryDate(Date expiryDate) { this.expiryDate = expiryDate; }
}
