package com.examly.springapp.repository;

import com.examly.springapp.model.BackgroundCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BackgroundCheckRepo extends JpaRepository<BackgroundCheck, Integer> {
    List<BackgroundCheck> findByApplicationId(Integer applicationId);
}
