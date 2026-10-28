package com.examly.springapp.service;

import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.repository.BiketaxiRepo;
import com.examly.springapp.repository.BackgroundCheckRepo;
import com.examly.springapp.repository.DocumentRepo;
import com.examly.springapp.repository.VehicleRepo;
import com.examly.springapp.model.DriverApplicationStatus;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BiketaxiService {

    @Autowired
    private BiketaxiRepo biketaxiRepo;

    @Autowired
    private BackgroundCheckRepo backgroundCheckRepo;

    @Autowired
    private DocumentRepo documentRepo;

    @Autowired
    private VehicleRepo vehicleRepo;

    @Autowired
    private com.examly.springapp.repository.AuditLogRepo auditLogRepo;

    @Autowired
    private com.examly.springapp.repository.UserRepository userRepository;

    @Transactional
    public boolean deleteBiketaxi(int id) {
        if (biketaxiRepo.existsById(id)) {
            vehicleRepo.findByApplicationId(id).ifPresent(vehicleRepo::delete);
            documentRepo.deleteAll(documentRepo.findByApplicationId(id));
            backgroundCheckRepo.deleteAll(backgroundCheckRepo.findByApplicationId(id));
            biketaxiRepo.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional
    public boolean addBiketaxi(Biketaxi biketaxi) {
        try {
            if (biketaxi.getBikeNumber() != null) {
                biketaxiRepo.findByBikeNumber(biketaxi.getBikeNumber()).ifPresent(existing -> {
                    deleteBiketaxi(existing.getId());
                    biketaxiRepo.flush();
                });
            }
            biketaxiRepo.save(biketaxi);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<Biketaxi> getAllBiketaxi() {
        return biketaxiRepo.findAll();
    }

    public List<Biketaxi> getBiketaxisByUserId(Integer userId) {
        return biketaxiRepo.findByUserId(userId);
    }

    public List<Biketaxi> getBiketaxisByStatus(DriverApplicationStatus status) {
        return biketaxiRepo.findByStatus(status);
    }

    public Optional<Biketaxi> getBiketaxiById(int id) {
        return biketaxiRepo.findById(id);
    }

    @Transactional
    public Biketaxi updateApplicationStatus(int id, DriverApplicationStatus newStatus) {
        return biketaxiRepo.findById(id).map(biketaxi -> {
            DriverApplicationStatus oldStatus = biketaxi.getStatus();
            biketaxi.setStatus(newStatus);
            Biketaxi saved = biketaxiRepo.save(biketaxi);

            try {
                org.springframework.security.core.Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
                if (auth != null) {
                    userRepository.findByUsername(auth.getName()).ifPresent(admin -> {
                        com.examly.springapp.model.AuditLog log = new com.examly.springapp.model.AuditLog();
                        log.setAdmin(admin);
                        log.setAction("UPDATE_APPLICATION_STATUS");
                        log.setEntityType("DriverApplication");
                        log.setEntityId(id);
                        log.setOldValues("status=" + oldStatus);
                        log.setNewValues("status=" + newStatus);
                        auditLogRepo.save(log);
                    });
                }
            } catch (Exception ignored) {}

            return saved;
        }).orElseThrow(() -> new RuntimeException("Application not found"));
    }
}
