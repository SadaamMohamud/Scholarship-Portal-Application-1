package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.DTO.ContactRequestDTO;
import com.Scholarship_Portal_Application.DTO.ContactResponseDTO;
import com.Scholarship_Portal_Application.Service.ContactServiceInterface;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactServiceInterface contactService;

    public ContactController(ContactServiceInterface contactService) {
        this.contactService = contactService;
    }

    // Public endpoint - anyone can submit the contact form
    @PostMapping
    public ResponseEntity<ContactResponseDTO> submitContact(
            @Valid @RequestBody ContactRequestDTO request) {
        ContactResponseDTO response = contactService.submitContact(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Admin only - paginated list of all submissions
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public ResponseEntity<Page<ContactResponseDTO>> getAllContacts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return ResponseEntity.ok(contactService.getAllContacts(pageable));
    }

    // Admin only - view single submission
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/{id}")
    public ResponseEntity<ContactResponseDTO> getContactById(@PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContactById(id));
    }

    // Admin only - delete a submission
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        contactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}