package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.Entity.StatusHistory;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Service.StatusHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class StatusController {

    private final StatusHistoryService statusHistoryService;

    public StatusController(StatusHistoryService statusHistoryService) {
        this.statusHistoryService = statusHistoryService;
    }

    // Get current status of application
    @GetMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('STUDENT', 'COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<ApplicationStatus> getCurrentStatus(@PathVariable Long id) {
        return ResponseEntity.ok(statusHistoryService.getCurrentStatus(id));
    }

    // Get full status history
    @GetMapping("/{id}/history")
    @PreAuthorize("hasAnyRole('STUDENT', 'COMMITTEE', 'TEACHER', 'ADMIN')")
    public ResponseEntity<List<StatusHistory>> getHistory(@PathVariable Long id) {
        return ResponseEntity.ok(statusHistoryService.getHistoryByApplication(id));
    }
}