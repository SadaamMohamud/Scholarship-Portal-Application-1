package com.Scholarship_Portal_Application.Repository;

import com.Scholarship_Portal_Application.Entity.Contact;
import com.Scholarship_Portal_Application.Enum.ContactSubject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    // For admin panel: paginated list of all submissions, newest first
    Page<Contact> findAllByOrderByCreatedAtDesc(Pageable pageable);

    // Filter by subject (e.g. admin wants to see only "Technical Issue" messages)
    Page<Contact> findBySubject(ContactSubject subject, Pageable pageable);

    // Useful if you want to check/prevent spam or duplicate submissions from same email
    List<Contact> findByEmail(String email);

    // Optional: search by name (case-insensitive, partial match)
    Page<Contact> findByFullNameContainingIgnoreCase(String fullName, Pageable pageable);
}