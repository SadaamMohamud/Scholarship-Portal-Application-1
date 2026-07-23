package com.Scholarship_Portal_Application.Service;


import com.Scholarship_Portal_Application.DTO.AuthResponseDTO;
import com.Scholarship_Portal_Application.DTO.LoginRequestDTO;
import com.Scholarship_Portal_Application.DTO.RegisterRequestDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO request);

    AuthResponseDTO login(LoginRequestDTO request);
}
