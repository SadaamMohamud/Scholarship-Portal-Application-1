package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.DTO.CategoryStatsResponseDTO;
import com.Scholarship_Portal_Application.DTO.DashboardResponseDTO;

import java.util.List;

public interface DashboardService {

    DashboardResponseDTO getKpiSummary();

    List<CategoryStatsResponseDTO> getCategoryStats();
}
