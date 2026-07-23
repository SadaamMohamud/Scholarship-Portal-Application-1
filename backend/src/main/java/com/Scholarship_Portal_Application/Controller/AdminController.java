package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.RegisterRequestDTO;
import com.Scholarship_Portal_Application.Enum.Role;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Admin creates teacher/committee/admin accounts
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@Valid @RequestBody RegisterRequestDTO request,
                                           @RequestParam Role role) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        return ResponseEntity.ok(userRepository.save(user));
    }

    // Admin views all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }
    // Admin deletes a user
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("User not found with id: " + id));

        try {
            userRepository.delete(user);
        } catch (Exception e) {
            throw new BadRequestException(
                    "Cannot delete this user because they have existing applications, reviews, or awards linked to their account."
            );
        }

        return "User deleted successfully";
    }

}