package com.examly.springapp.controller;

import com.examly.springapp.model.*;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.OperationsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
public class OperationsController {

    private final OperationsService operationsService;
    private final UserRepository userRepository;

    public OperationsController(OperationsService operationsService, UserRepository userRepository) {
        this.operationsService = operationsService;
        this.userRepository = userRepository;
    }

    @PostMapping("/vehicles/{applicationId}")
    public ResponseEntity<Vehicle> registerVehicle(@PathVariable int applicationId, @RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(operationsService.registerVehicle(applicationId, vehicle));
    }

    @PostMapping("/documents/{applicationId}")
    public ResponseEntity<Document> uploadDocument(@PathVariable int applicationId, @RequestBody Document document) {
        return ResponseEntity.ok(operationsService.uploadDocumentMetadata(applicationId, document));
    }

    @PutMapping("/documents/{documentId}/verify")
    public ResponseEntity<Document> verifyDocument(@PathVariable int documentId, Authentication authentication) {
        User admin = userRepository.findByUsername(authentication.getName()).orElse(null);
        return ResponseEntity.ok(operationsService.verifyDocument(documentId, admin));
    }

    @PostMapping("/background-checks/{applicationId}")
    public ResponseEntity<BackgroundCheck> initiateCheck(@PathVariable int applicationId, @RequestBody BackgroundCheck check) {
        return ResponseEntity.ok(operationsService.initiateBackgroundCheck(applicationId, check));
    }

    @PutMapping("/background-checks/{checkId}/status")
    public ResponseEntity<BackgroundCheck> updateCheckStatus(
            @PathVariable int checkId, 
            @RequestParam BackgroundCheck.CheckStatus status,
            @RequestParam(required = false) BackgroundCheck.CheckResult result) {
        return ResponseEntity.ok(operationsService.updateBackgroundCheckStatus(checkId, status, result));
    }

    @GetMapping("/performance/my-stats")
    public ResponseEntity<DriverPerformance> getMyPerformance(Authentication authentication) {
        User driver = userRepository.findByUsername(authentication.getName()).orElseThrow();
        DriverPerformance perf = operationsService.getMyPerformance(driver.getId());
        if (perf == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(perf);
    }

    @GetMapping("/notifications/unread")
    public ResponseEntity<List<Notification>> getMyUnreadNotifications(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
        return ResponseEntity.ok(operationsService.getMyUnreadNotifications(user.getId()));
    }

    @GetMapping("/vehicles/{applicationId}")
    public ResponseEntity<Vehicle> getVehicle(@PathVariable int applicationId) {
        Vehicle vehicle = operationsService.getVehicleByApplicationId(applicationId);
        if (vehicle == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vehicle);
    }

    @GetMapping("/documents/{applicationId}")
    public ResponseEntity<List<Document>> getDocuments(@PathVariable int applicationId) {
        return ResponseEntity.ok(operationsService.getDocumentsByApplicationId(applicationId));
    }

    @GetMapping("/background-checks/{applicationId}")
    public ResponseEntity<List<BackgroundCheck>> getBackgroundChecks(@PathVariable int applicationId) {
        return ResponseEntity.ok(operationsService.getBackgroundChecksByApplicationId(applicationId));
    }

    @PutMapping("/notifications/{id}/read")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable int id) {
        return ResponseEntity.ok(operationsService.markNotificationAsRead(id));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(operationsService.getAllAuditLogs());
    }
}
