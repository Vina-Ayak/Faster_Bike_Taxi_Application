package com.examly.springapp.controller;

import com.examly.springapp.model.Biketaxi;
import com.examly.springapp.service.BiketaxiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.springapp.model.DriverApplicationStatus;
import java.util.List;
import java.util.Optional;
import org.springframework.security.core.Authentication;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.model.User;

@RestController
@CrossOrigin(origins = "*") // Or configure in CorsConfiguration
public class ApiController {

    @Autowired
    private BiketaxiService biketaxiService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addBiketaxi")
    public ResponseEntity<Void> addBiketaxi(@RequestBody Biketaxi biketaxi, Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            User user = userRepository.findByUsername(authentication.getName()).orElse(null);
            biketaxi.setUser(user);
        }
        boolean added = biketaxiService.addBiketaxi(biketaxi);
        if (added) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAllBiketaxi")
    public ResponseEntity<List<Biketaxi>> getAllBiketaxi(Authentication authentication) {
        try {
            if (authentication == null || !authentication.isAuthenticated()) {
                List<Biketaxi> biketaxis = biketaxiService.getAllBiketaxi();
                return new ResponseEntity<>(biketaxis, HttpStatus.OK);
            }
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
            
            if (isAdmin) {
                List<Biketaxi> biketaxis = biketaxiService.getAllBiketaxi();
                return new ResponseEntity<>(biketaxis, HttpStatus.OK);
            } else {
                User user = userRepository.findByUsername(authentication.getName()).orElse(null);
                if (user == null) {
                    return new ResponseEntity<>(biketaxiService.getAllBiketaxi(), HttpStatus.OK);
                }
                List<Biketaxi> userBiketaxis = biketaxiService.getBiketaxisByUserId(user.getId());
                return new ResponseEntity<>(userBiketaxis, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/biketaxi/{id}")
    public ResponseEntity<Biketaxi> getBiketaxiById(@PathVariable int id, Authentication authentication) {
        Optional<Biketaxi> biketaxiOpt = biketaxiService.getBiketaxiById(id);
        if (biketaxiOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        
        Biketaxi biketaxi = biketaxiOpt.get();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
                
        if (!isAdmin) {
            User user = userRepository.findByUsername(authentication.getName()).orElseThrow();
            if (biketaxi.getUser() == null || !biketaxi.getUser().getId().equals(user.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Return 403 instead of 404
            }
        }
        
        return ResponseEntity.ok(biketaxi);
    }

    @PutMapping("/api/biketaxi/{id}/status")
    public ResponseEntity<Biketaxi> updateApplicationStatus(
            @PathVariable int id, 
            @RequestParam DriverApplicationStatus status) {
        try {
            Biketaxi updated = biketaxiService.updateApplicationStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/api/biketaxi/status/{status}")
    public ResponseEntity<List<Biketaxi>> getBiketaxisByStatus(@PathVariable DriverApplicationStatus status) {
        try {
            List<Biketaxi> biketaxis = biketaxiService.getBiketaxisByStatus(status);
            return new ResponseEntity<>(biketaxis, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/api/biketaxi/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable int id) {
        boolean deleted = biketaxiService.deleteBiketaxi(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
