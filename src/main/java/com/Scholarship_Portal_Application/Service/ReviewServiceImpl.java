package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.DTO.ReviewRequestDTO;
import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.Review;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ApplicationRepository applicationRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository,
                             ApplicationRepository applicationRepository) {
        this.reviewRepository = reviewRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Review submitReview(User reviewer, ReviewRequestDTO dto) {

        Application application = applicationRepository.findById(dto.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + dto.getApplicationId()));

        // Check if reviewer already reviewed this application
        boolean alreadyReviewed = reviewRepository
                .existsByApplicationIdAndReviewerId(dto.getApplicationId(), reviewer.getId());
        if (alreadyReviewed) {
            throw new BadRequestException("You have already reviewed this application");
        }

        Review review = new Review();
        review.setApplication(application);
        review.setReviewer(reviewer);
        review.setScore(dto.getScore());
        review.setComments(dto.getComments());

        // Update application status to UNDER_REVIEW on first review
        if (application.getStatus() == ApplicationStatus.SUBMITTED) {
            application.setStatus(ApplicationStatus.UNDER_REVIEW);
            applicationRepository.save(application);
        }

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getByApplication(Long applicationId) {
        return reviewRepository.findByApplicationId(applicationId);
    }

    @Override
    public List<Review> getByReviewer(Long reviewerId) {
        return reviewRepository.findByReviewerId(reviewerId);
    }

    @Override
    public Review getById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Review not found with id: " + id));
    }

    @Override
    public Double getAverageScore(Long applicationId) {
        List<Review> reviews = reviewRepository.findByApplicationId(applicationId);
        if (reviews.isEmpty()) return 0.0;
        return reviews.stream()
                .mapToInt(Review::getScore)
                .average()
                .orElse(0.0);
    }
    @Override
    public void delete(Long id) {
        Review review = getById(id);
        reviewRepository.delete(review);
    }
}
