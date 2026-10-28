package com.examly.springapp.repository;

import com.examly.springapp.model.Biketaxi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BiketaxiRepo extends JpaRepository<Biketaxi, Integer> {
    List<Biketaxi> findByUserId(Integer userId);
    List<Biketaxi> findByStatus(com.examly.springapp.model.DriverApplicationStatus status);
    java.util.Optional<Biketaxi> findByBikeNumber(String bikeNumber);
}
