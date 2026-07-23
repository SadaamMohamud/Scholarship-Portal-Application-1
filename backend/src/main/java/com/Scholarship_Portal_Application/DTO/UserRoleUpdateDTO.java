package com.Scholarship_Portal_Application.DTO;

import com.Scholarship_Portal_Application.Enum.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleUpdateDTO {
    private Role role;
}