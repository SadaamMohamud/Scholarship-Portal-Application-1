package com.Scholarship_Portal_Application.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {

    private Long id;
    private String token;
    private String fullName;
    private String email;
    private String role;
}