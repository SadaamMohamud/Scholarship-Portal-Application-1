package com.Scholarship_Portal_Application.Repository;


import com.Scholarship_Portal_Application.Entity.Award;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AwardRepository extends JpaRepository<Award, Long> {

    List<Award> findByStudentId(Long studentId);

    Optional<Award> findByApplicationId(Long applicationId);

    List<Award> findByScholarshipId(Long scholarshipId);
}
