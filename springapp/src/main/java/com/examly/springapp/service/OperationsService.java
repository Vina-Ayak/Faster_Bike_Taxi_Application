package com.examly.springapp.service;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OperationsService {

    private final VehicleRepo vehicleRepo;
    private final DocumentRepo documentRepo;
    private final BackgroundCheckRepo backgroundCheckRepo;
    private final DriverPerformanceRepo performanceRepo;
    private final NotificationRepo notificationRepo;
    private final BiketaxiRepo biketaxiRepo;
    private final AuditLogRepo auditLogRepo;

    public OperationsService(VehicleRepo vehicleRepo, DocumentRepo documentRepo, BackgroundCheckRepo backgroundCheckRepo, DriverPerformanceRepo performanceRepo, NotificationRepo notificationRepo, BiketaxiRepo biketaxiRepo, AuditLogRepo auditLogRepo) {
        this.vehicleRepo = vehicleRepo;
        this.documentRepo = documentRepo;
        this.backgroundCheckRepo = backgroundCheckRepo;
        this.performanceRepo = performanceRepo;
        this.notificationRepo = notificationRepo;
        this.biketaxiRepo = biketaxiRepo;
        this.auditLogRepo = auditLogRepo;
    }

    public Vehicle registerVehicle(int applicationId, Vehicle vehicle) {
        Biketaxi app = biketaxiRepo.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        vehicle.setApplication(app);
        return vehicleRepo.save(vehicle);
    }

    public Document uploadDocumentMetadata(int applicationId, Document document) {
        Biketaxi app = biketaxiRepo.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        document.setApplication(app);
        return documentRepo.save(document);
    }

    @Transactional
    public Document verifyDocument(int documentId, User adminUser) {
        Document doc = documentRepo.findById(documentId)
            .orElseThrow(() -> new RuntimeException("Document not found"));
        doc.setVerificationStatus(Document.VerificationStatus.VERIFIED);
        doc.setVerifiedBy(adminUser);
        doc.setVerificationDate(new java.sql.Timestamp(System.currentTimeMillis()));
        return documentRepo.save(doc);
    }

    public BackgroundCheck initiateBackgroundCheck(int applicationId, BackgroundCheck check) {
        Biketaxi app = biketaxiRepo.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));
        check.setApplication(app);
        return backgroundCheckRepo.save(check);
    }

    public BackgroundCheck updateBackgroundCheckStatus(int checkId, BackgroundCheck.CheckStatus status, BackgroundCheck.CheckResult result) {
        BackgroundCheck check = backgroundCheckRepo.findById(checkId)
            .orElseThrow(() -> new RuntimeException("Check not found"));
        check.setStatus(status);
        if (result != null) {
            check.setResult(result);
            check.setCompletionDate(new java.sql.Timestamp(System.currentTimeMillis()));
        }
        return backgroundCheckRepo.save(check);
    }

    public DriverPerformance getMyPerformance(Integer driverId) {
        return performanceRepo.findByDriverId(driverId).orElseGet(() -> {
            DriverPerformance dp = new DriverPerformance();
            dp.setTotalRides(0);
            dp.setCompletedRides(0);
            dp.setCancelledRides(0);
            dp.setAverageRating(new java.math.BigDecimal("5.00"));
            dp.setTotalEarnings(new java.math.BigDecimal("0.00"));
            dp.setPerformanceScore(100);
            dp.setStatus(DriverPerformance.DriverStatus.ACTIVE);
            dp.setLastActiveDate(new java.sql.Timestamp(System.currentTimeMillis()));
            return dp;
        });
    }

    public List<Notification> getMyUnreadNotifications(Integer userId) {
        return notificationRepo.findByUserIdAndIsReadFalse(userId);
    }

    public Vehicle getVehicleByApplicationId(int applicationId) {
        return vehicleRepo.findByApplicationId(applicationId).orElse(null);
    }

    public List<Document> getDocumentsByApplicationId(int applicationId) {
        return documentRepo.findByApplicationId(applicationId);
    }

    public List<BackgroundCheck> getBackgroundChecksByApplicationId(int applicationId) {
        return backgroundCheckRepo.findByApplicationId(applicationId);
    }

    @Transactional
    public Notification markNotificationAsRead(int notificationId) {
        Notification notification = notificationRepo.findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setIsRead(true);
        return notificationRepo.save(notification);
    }

    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepo.findAll();
    }
}
