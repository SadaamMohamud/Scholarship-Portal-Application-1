package com.Scholarship_Portal_Application.Repository;



import com.Scholarship_Portal_Application.Entity.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

    // Get full chronological history for one application
    List<StatusHistory> findByApplicationIdOrderByChangedAtAsc(Long applicationId);
}
