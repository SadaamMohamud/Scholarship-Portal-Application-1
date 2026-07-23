package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.DTO.AuthResponseDTO;
import com.Scholarship_Portal_Application.DTO.LoginRequestDTO;
import com.Scholarship_Portal_Application.DTO.RegisterRequestDTO;
import com.Scholarship_Portal_Application.Enum.Role;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import com.Scholarship_Portal_Application.Security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponseDTO register(RegisterRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_STUDENT);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // id + fullName added here ✅
        return new AuthResponseDTO(user.getId(), token, user.getFullName(), user.getEmail(), user.getRole().name());
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        // id + fullName added here ✅
        return new AuthResponseDTO(user.getId(), token, user.getFullName(), user.getEmail(), user.getRole().name());
    }
}