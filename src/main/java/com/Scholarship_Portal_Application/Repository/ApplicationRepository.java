package com.Scholarship_Portal_Application.Repository;


import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByStudentId(Long studentId);

    List<Application> findByStatus(ApplicationStatus status);

    List<Application> findByScholarshipId(Long scholarshipId);

    boolean existsByStudentIdAndScholarshipId(Long studentId, Long scholarshipId);
}
