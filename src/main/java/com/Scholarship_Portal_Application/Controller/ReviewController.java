package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.ReviewRequestDTO;
import com.Scholarship_Portal_Application.Entity.Review;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import com.Scholarship_Portal_Application.Service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserRepository userRepository;

    public ReviewController(ReviewService reviewService,
                            UserRepository userRepository) {
        this.reviewService = reviewService;
        this.userRepository = userRepository;
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // Committee submits review
    @PostMapping
    @PreAuthorize("hasAnyRole('COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> submit(@Valid @RequestBody ReviewRequestDTO dto,
                                                      Authentication authentication) {
        User reviewer = getCurrentUser(authentication);
        Review created = reviewService.submitReview(reviewer, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Review submitted successfully");
        response.put("data", created);
        return ResponseEntity.ok(response);
    }

    // Get all reviews for an application
    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasAnyRole('COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<List<Review>> getByApplication(@PathVariable Long applicationId) {
        return ResponseEntity.ok(reviewService.getByApplication(applicationId));
    }

    // Get average score for an application
    @GetMapping("/application/{applicationId}/average")
    @PreAuthorize("hasAnyRole('COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<Double> getAverageScore(@PathVariable Long applicationId) {
        return ResponseEntity.ok(reviewService.getAverageScore(applicationId));
    }

    // Get review by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<Review> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getById(id));
    }

    // Committee member views own reviews
    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<List<Review>> getMyReviews(Authentication authentication) {
        User reviewer = getCurrentUser(authentication);
        return ResponseEntity.ok(reviewService.getByReviewer(reviewer.getId()));
    }
    // Admin/Committee/Teacher deletes a review
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('COMMITTEE', 'TEACHER', 'ADMIN')")
    public String delete(@PathVariable Long id) {
        reviewService.delete(id);
        return "Review deleted successfully";
    }
}