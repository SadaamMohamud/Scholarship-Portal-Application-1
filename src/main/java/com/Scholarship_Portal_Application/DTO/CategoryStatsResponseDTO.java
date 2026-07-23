package com.Scholarship_Portal_Application.DTO;


import com.Scholarship_Portal_Application.Enum.ScholarshipCategory;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryStatsResponseDTO {

    private String category;
    private long scholarshipCount;
    private long applicationCount;

    public CategoryStatsResponseDTO(ScholarshipCategory key, int size, int applicationCount) {
        this.category = key.name();
        this.scholarshipCount = size;
        this.applicationCount = applicationCount;
    }
}
