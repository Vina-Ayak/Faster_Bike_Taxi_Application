package com.examly.springapp.repository;

import com.examly.springapp.model.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VehicleRepo extends JpaRepository<Vehicle, Integer> {
    Optional<Vehicle> findByApplicationId(int applicationId);
}
