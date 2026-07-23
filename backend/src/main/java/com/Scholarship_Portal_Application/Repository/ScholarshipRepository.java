package com.Scholarship_Portal_Application.Repository;

import com.Scholarship_Portal_Application.Entity.Scholarship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ScholarshipRepository extends JpaRepository<Scholarship, Long> {

    List<Scholarship> findByCategory(String category);

    List<Scholarship> findByIsActiveTrue();

    List<Scholarship> findByApplicationDeadlineAfter(LocalDate date);

    boolean existsByTitle(String title);

    List<Scholarship> findByLevel(String level);

    List<Scholarship> findByLocationContainingIgnoreCase(String location);
}