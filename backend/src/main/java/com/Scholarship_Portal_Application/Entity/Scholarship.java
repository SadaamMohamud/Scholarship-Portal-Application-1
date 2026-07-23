package com.Scholarship_Portal_Application.Entity;

import com.Scholarship_Portal_Application.Enum.ScholarshipCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import com.Scholarship_Portal_Application.Enum.ScholarshipLevel;

@Entity
@Table(name = "scholarships")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Scholarship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String eligibilityCriteria;

    @NotNull(message = "Category is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScholarshipCategory category;

    @PositiveOrZero(message = "Minimum GPA must be 0 or greater")
    @Column(nullable = false)
    private Double minGpa = 0.0;

    @Positive(message = "Award amount must be greater than 0")
    @Column(precision = 10, scale = 2)
    private BigDecimal awardAmount;

    @Positive(message = "Total slots must be greater than 0")
    @Column(nullable = false)
    private Integer totalSlots = 0;

    @Column(nullable = false)
    private Integer remainingSlots = 0;

    @NotNull(message = "Application deadline is required")
    @Future(message = "Application deadline must be a future date")
    @Column(nullable = false)
    private LocalDate applicationDeadline;

    @Column(nullable = false)
    private boolean isActive = true;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public BigDecimal getAmount() {
        return null;

    }
    @Enumerated(EnumType.STRING)
    private ScholarshipLevel level;

    @Column(length = 255)
    private String location;

    @Column(length = 500)
    private String imageUrl;
}