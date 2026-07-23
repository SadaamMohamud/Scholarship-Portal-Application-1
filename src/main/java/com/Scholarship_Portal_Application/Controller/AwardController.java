package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.Entity.Award;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import com.Scholarship_Portal_Application.Service.AwardService;
import com.Scholarship_Portal_Application.Service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/awards")
public class AwardController {

    private final AwardService awardService;
    private final NotificationService notificationService;
    private final UserRepository userRepository;

    public AwardController(AwardService awardService,
                           NotificationService notificationService,
                           UserRepository userRepository) {
        this.awardService = awardService;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    private User getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // Admin issues award
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> issueAward(@RequestParam Long applicationId,
                                                          @RequestParam(required = false) String note,
                                                          Authentication authentication) {
        User admin = getCurrentUser(authentication);
        Award award = awardService.issueAward(applicationId, note, admin);

        // Send award notification email async
        notificationService.sendAwardNotification(award);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Award issued successfully");
        response.put("data", award);
        return ResponseEntity.ok(response);
    }

    // Get award by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<Award> getById(@PathVariable Long id) {
        return ResponseEntity.ok(awardService.getById(id));
    }

    // Student views own awards
    @GetMapping("/my")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Award>> getMyAwards(Authentication authentication) {
        User student = getCurrentUser(authentication);
        return ResponseEntity.ok(awardService.getAwardsByStudent(student.getId()));
    }

    // Admin views all awards
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Award>> getAllAwards() {
        return ResponseEntity.ok(awardService.getAllAwards());
    }

    // Admin deletes an award
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String delete(@PathVariable Long id) {
        awardService.delete(id);
        return "Award deleted successfully";
    }
}