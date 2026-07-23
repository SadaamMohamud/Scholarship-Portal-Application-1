package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.ApplicationRequestDTO;
import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import com.Scholarship_Portal_Application.Service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;
    private final UserRepository userRepository;

    public ApplicationController(ApplicationService applicationService,
                                 UserRepository userRepository) {
        this.applicationService = applicationService;
        this.userRepository = userRepository;
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // Student submits application
    @PostMapping
    @PreAuthorize("hasRole( 'STUDENT')")
    public ResponseEntity<Map<String, Object>> submit(@Valid @RequestBody ApplicationRequestDTO dto,
                                                      Authentication authentication) {
        User student = getCurrentUser(authentication);
        Application created = applicationService.submitApplication(student, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Application submitted successfully");
        response.put("data", created);
        return ResponseEntity.ok(response);
    }

    // Student views own applications
    @GetMapping("/my")
    @PreAuthorize("hasRole( 'STUDENT')")
    public ResponseEntity<List<Application>> getMyApplications(Authentication authentication) {
        User student = getCurrentUser(authentication);
        return ResponseEntity.ok(applicationService.getMyApplications(student.getId()));
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<Application> getById(@PathVariable Long id) {
        return ResponseEntity.ok(applicationService.getById(id));
    }

    // Student withdraws own application
    @DeleteMapping("/{id}/withdraw")
    @PreAuthorize("hasRole( 'STUDENT')")
    public ResponseEntity<Void> withdraw(@PathVariable Long id,
                                         Authentication authentication) {
        User student = getCurrentUser(authentication);
        applicationService.withdraw(id, student.getId());
        return ResponseEntity.noContent().build();
    }

    // Admin/Committee views all applications
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'COMMITTEE', 'TEACHER')")
    public ResponseEntity<List<Application>> getAll() {
        return ResponseEntity.ok(applicationService.getByStatus(ApplicationStatus.SUBMITTED));
    }

    // Admin/Committee views by scholarship
    @GetMapping("/scholarship/{scholarshipId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMMITTEE', 'TEACHER')")
    public ResponseEntity<List<Application>> getByScholarship(@PathVariable Long scholarshipId) {
        return ResponseEntity.ok(applicationService.getByScholarship(scholarshipId));
    }

    // Admin/Committee filters by status
    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMMITTEE', 'TEACHER')")
    public ResponseEntity<List<Application>> getByStatus(@PathVariable ApplicationStatus status) {
        return ResponseEntity.ok(applicationService.getByStatus(status));
    }

    // Admin updates application status
    @PutMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'COMMITTEE', 'TEACHER')")
    public ResponseEntity<Map<String, Object>> updateStatus(@PathVariable Long id,
                                                            @RequestParam ApplicationStatus status) {
        Application updated = applicationService.updateStatus(id, status);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Application status updated successfully");
        response.put("data", updated);
        return ResponseEntity.ok(response);
    }
}