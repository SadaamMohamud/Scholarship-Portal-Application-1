package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.ScholarshipRequestDTO;
import com.Scholarship_Portal_Application.Entity.Scholarship;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import com.Scholarship_Portal_Application.Service.ScholarshipService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/scholarships")
public class ScholarshipController {

    private final ScholarshipService scholarshipService;
    private final UserRepository userRepository;

    public ScholarshipController(ScholarshipService scholarshipService,
                                 UserRepository userRepository) {
        this.scholarshipService = scholarshipService;
        this.userRepository = userRepository;
    }

    // Public - browse all active scholarships
    @GetMapping
    public ResponseEntity<List<Scholarship>> getAll() {
        return ResponseEntity.ok(scholarshipService.getAllActiveScholarships());
    }

    // Public - get scholarship by ID
    @GetMapping("/{id}")
    public ResponseEntity<Scholarship> getById(@PathVariable Long id) {
        return ResponseEntity.ok(scholarshipService.getById(id));
    }

    // Public - filter by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Scholarship>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(scholarshipService.getByCategory(category));
    }

    // Student/Public - check eligibility
    @GetMapping("/{id}/eligibility")
    public ResponseEntity<Boolean> checkEligibility(@PathVariable Long id,
                                                    Authentication authentication) {
        String email = authentication.getName();
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(scholarshipService.checkEligibility(id, user.getId()));
    }

    // Admin only - create scholarship
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody ScholarshipRequestDTO request) {
        Scholarship created = scholarshipService.create(request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Scholarship created successfully");
        response.put("data", created);
        return ResponseEntity.ok(response);
    }

    // Admin only - update scholarship
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
                                                      @Valid @RequestBody ScholarshipRequestDTO request) {
        Scholarship updated = scholarshipService.update(id, request);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Scholarship updated successfully");
        response.put("data", updated);
        return ResponseEntity.ok(response);
    }

    // Admin only - upload/replace scholarship image
    @PostMapping(value = "/{id}/image", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> uploadImage(@PathVariable Long id,
                                                           @RequestParam("file") MultipartFile file) {
        Scholarship updated = scholarshipService.uploadImage(id, file);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Scholarship image uploaded successfully");
        response.put("data", updated);
        return ResponseEntity.ok(response);
    }

    // Admin only - deactivate scholarship
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivate(@PathVariable Long id) {
        scholarshipService.deactivate(id);
        return ResponseEntity.noContent().build();
    }
    // Public - filter by level
    @GetMapping("/level/{level}")
    public ResponseEntity<List<Scholarship>> getByLevel(@PathVariable String level) {
        return ResponseEntity.ok(scholarshipService.getByLevel(level));
    }

    // Public - filter by location
    @GetMapping("/location/{location}")
    public ResponseEntity<List<Scholarship>> getByLocation(@PathVariable String location) {
        return ResponseEntity.ok(scholarshipService.getByLocation(location));
    }
}