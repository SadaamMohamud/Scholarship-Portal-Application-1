package com.Scholarship_Portal_Application.DTO;

import com.Scholarship_Portal_Application.Enum.ScholarshipCategory;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.Scholarship_Portal_Application.Enum.ScholarshipLevel;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScholarshipRequestDTO {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 20, max = 1000, message = "Description must be between 20 and 1000 characters")
    private String description;

    @NotBlank(message = "Eligibility criteria is required")
    @Size(min = 10, max = 500, message = "Eligibility criteria must be between 10 and 500 characters")
    private String eligibilityCriteria;

    @NotNull(message = "Category is required")
    private ScholarshipCategory category;

    @PositiveOrZero(message = "Minimum GPA must be 0 or greater")
    private Double minGpa = 0.0;

    @Positive(message = "Award amount must be greater than 0")
    private BigDecimal awardAmount;

    @Positive(message = "Total slots must be greater than 0")
    private Integer totalSlots;

    @Future(message = "Application deadline must be a future date")
    private LocalDate applicationDeadline;

    private ScholarshipLevel level;

    private String location;

    private String imageUrl;
}