package com.Scholarship_Portal_Application.DTO;



import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequestDTO {

    @NotNull(message = "Scholarship ID is required")
    private Long scholarshipId;

    private String personalStatement;
}
