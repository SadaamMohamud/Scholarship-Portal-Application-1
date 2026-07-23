package com.Scholarship_Portal_Application.Repository;



import com.Scholarship_Portal_Application.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByApplicationId(Long applicationId);

    List<Review> findByReviewerId(Long reviewerId);

    boolean existsByApplicationIdAndReviewerId(Long applicationId, Long reviewerId);

}