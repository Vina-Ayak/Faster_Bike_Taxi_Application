package com.examly.springapp.repository;

import com.examly.springapp.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepo extends JpaRepository<Document, Integer> {
    List<Document> findByApplicationId(int applicationId);
}
