package com.examly.springapp.repository;

import com.examly.springapp.model.DriverPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DriverPerformanceRepo extends JpaRepository<DriverPerformance, Integer> {
    Optional<DriverPerformance> findByDriverId(Integer driverId);
}
