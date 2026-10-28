package com.examly.springapp.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Audit_Logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private User admin;

    @Column(nullable = false, length = 100)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String action;

    @Column(nullable = false, length = 100)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String entityType;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private int entityId;

    @Column(columnDefinition = "TEXT")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String oldValues;

    @Column(columnDefinition = "TEXT")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String newValues;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Timestamp timestamp;

    public AuditLog() {}

    @PrePersist
    protected void onCreate() {
        timestamp = new Timestamp(System.currentTimeMillis());
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public User getAdmin() { return admin; }
    public void setAdmin(User admin) { this.admin = admin; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public int getEntityId() { return entityId; }
    public void setEntityId(int entityId) { this.entityId = entityId; }
    public String getOldValues() { return oldValues; }
    public void setOldValues(String oldValues) { this.oldValues = oldValues; }
    public String getNewValues() { return newValues; }
    public void setNewValues(String newValues) { this.newValues = newValues; }
    public Timestamp getTimestamp() { return timestamp; }
    public void setTimestamp(Timestamp timestamp) { this.timestamp = timestamp; }

    @JsonProperty("adminUsername")
    public String getAdminUsername() {
        return admin != null ? admin.getUsername() : "System";
    }
}
