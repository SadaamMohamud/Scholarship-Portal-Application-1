package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.UserResponseDTO;
import com.Scholarship_Portal_Application.DTO.UserRoleUpdateDTO;
import com.Scholarship_Portal_Application.DTO.UserUpdateDTO;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserUpdateDTO updateDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        user.setFullName(updateDTO.getFullName());
        user.setEmail(updateDTO.getEmail());
        user.setPhone(updateDTO.getPhone());

        User saved = userRepository.save(user);
        return ResponseEntity.ok(saved);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userRepository.findAll().stream()
                .map(u -> new UserResponseDTO(u.getId(), u.getFullName(), u.getEmail(), u.getPhone(), u.getRole()))
                .toList();
        return ResponseEntity.ok(users);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/role")
    public ResponseEntity<UserResponseDTO> updateUserRole(@PathVariable Long id, @RequestBody UserRoleUpdateDTO roleDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        user.setRole(roleDTO.getRole());
        User saved = userRepository.save(user);

        return ResponseEntity.ok(new UserResponseDTO(saved.getId(),
                saved.getFullName(), saved.getEmail(), saved.getPhone(), saved.getRole()));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
        try {
            userRepository.deleteById(id);
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new BadRequestException("Cannot delete this user — they have existing applications linked to their account.");
        }
        return ResponseEntity.noContent().build();
    }

}