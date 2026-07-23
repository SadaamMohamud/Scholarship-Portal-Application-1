package com.Scholarship_Portal_Application.Controller;

import com.Scholarship_Portal_Application.Entity.Document;
import com.Scholarship_Portal_Application.Service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    // Student uploads document
    @PostMapping(consumes = "multipart/form-data")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("applicationId") Long applicationId,
                                                      @RequestParam("documentType") String documentType,
                                                      @RequestParam("file") MultipartFile file) {
        Document uploaded = documentService.uploadDocument(applicationId, documentType, file);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Document uploaded successfully");
        response.put("data", uploaded);
        return ResponseEntity.ok(response);
    }

    // Get all documents for an application
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<Document>> getByApplication(@PathVariable Long applicationId) {
        return ResponseEntity.ok(documentService.getByApplication(applicationId));
    }

    // Get document by ID
    @GetMapping("/{id}")
    public ResponseEntity<Document> getById(@PathVariable Long id) {
        return ResponseEntity.ok(documentService.getById(id));
    }

    // Student deletes own document
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public String delete(@PathVariable Long id) {
        documentService.delete(id);
        return "Document deleted successfully";
    }
}