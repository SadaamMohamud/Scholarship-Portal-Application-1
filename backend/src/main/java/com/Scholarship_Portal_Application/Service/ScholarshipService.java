package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.DTO.ScholarshipRequestDTO;
import com.Scholarship_Portal_Application.Entity.Scholarship;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ScholarshipService {

    List<Scholarship> getAllActiveScholarships();

    List<Scholarship> getByCategory(String category);

    Scholarship getById(Long id);

    boolean checkEligibility(Long scholarshipId, Long studentId);

    Scholarship create(ScholarshipRequestDTO request);

    Scholarship update(Long id, ScholarshipRequestDTO request);

    Scholarship uploadImage(Long id, MultipartFile file);

    void deactivate(Long id);

    List<Scholarship> getByLevel(String level);

    List<Scholarship> getByLocation(String location);
}