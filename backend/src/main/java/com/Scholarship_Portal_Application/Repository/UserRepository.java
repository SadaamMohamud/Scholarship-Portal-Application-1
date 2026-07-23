package com.Scholarship_Portal_Application.Repository;


import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    // for dashboard KPIs
    long countByRole(Role role);
}