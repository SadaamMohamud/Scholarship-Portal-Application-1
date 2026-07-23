package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.DTO.ReviewRequestDTO;
import com.Scholarship_Portal_Application.Entity.Review;
import com.Scholarship_Portal_Application.Entity.User;

import java.util.List;

public interface ReviewService {

    Review submitReview(User reviewer, ReviewRequestDTO dto);

    List<Review> getByApplication(Long applicationId);

    List<Review> getByReviewer(Long reviewerId);

    Review getById(Long id);

    Double getAverageScore(Long applicationId);

    void delete(Long id);
}