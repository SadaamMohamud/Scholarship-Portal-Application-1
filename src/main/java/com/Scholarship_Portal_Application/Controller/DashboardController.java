package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.CategoryStatsResponseDTO;
import com.Scholarship_Portal_Application.DTO.DashboardResponseDTO;
import com.Scholarship_Portal_Application.Service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // Full KPI summary
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> getDashboard() {
        return ResponseEntity.ok(dashboardService.getKpiSummary());
    }

    // Category breakdown
    @GetMapping("/stats/category")
    public ResponseEntity<List<CategoryStatsResponseDTO>> getCategoryStats() {
        return ResponseEntity.ok(dashboardService.getCategoryStats());
    }
}