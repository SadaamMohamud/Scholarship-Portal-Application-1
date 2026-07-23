package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.DTO.ScholarshipRequestDTO;
import com.Scholarship_Portal_Application.Entity.Scholarship;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.ScholarshipRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class ScholarshipServiceImpl implements ScholarshipService {

    private final ScholarshipRepository scholarshipRepository;
    private final ApplicationRepository applicationRepository;
    private final String UPLOAD_DIR = "uploads/scholarships/";

    public ScholarshipServiceImpl(ScholarshipRepository scholarshipRepository,
                                  ApplicationRepository applicationRepository) {
        this.scholarshipRepository = scholarshipRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public List<Scholarship> getAllActiveScholarships() {
        return scholarshipRepository.findByIsActiveTrue();
    }

    @Override
    public List<Scholarship> getByCategory(String category) {
        return scholarshipRepository.findByCategory(category);
    }

    @Override
    public Scholarship getById(Long id) {
        return scholarshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Scholarship not found with id: " + id));
    }

    @Override
    public boolean checkEligibility(Long scholarshipId, Long studentId) {
        Scholarship scholarship = getById(scholarshipId);
        if (scholarship.getRemainingSlots() <= 0) {
            return false;
        }
        if (!scholarship.isActive()) {
            return false;
        }
        return true;
    }

    @Override
    public Scholarship create(ScholarshipRequestDTO request) {

        if (scholarshipRepository.existsByTitle(request.getTitle())) {
            throw new BadRequestException("A scholarship with this title already exists");
        }

        Scholarship scholarship = new Scholarship();
        scholarship.setTitle(request.getTitle());
        scholarship.setDescription(request.getDescription());
        scholarship.setEligibilityCriteria(request.getEligibilityCriteria());
        scholarship.setCategory(request.getCategory());
        scholarship.setLevel(request.getLevel());
        scholarship.setLocation(request.getLocation());
        scholarship.setMinGpa(request.getMinGpa());
        scholarship.setAwardAmount(request.getAwardAmount());
        scholarship.setTotalSlots(request.getTotalSlots());
        scholarship.setRemainingSlots(request.getTotalSlots());
        scholarship.setApplicationDeadline(request.getApplicationDeadline());

        return scholarshipRepository.save(scholarship);
    }

    @Override
    public Scholarship update(Long id, ScholarshipRequestDTO request) {
        Scholarship scholarship = getById(id);
        scholarship.setTitle(request.getTitle());
        scholarship.setDescription(request.getDescription());
        scholarship.setEligibilityCriteria(request.getEligibilityCriteria());
        scholarship.setCategory(request.getCategory());
        scholarship.setLevel(request.getLevel());
        scholarship.setLocation(request.getLocation());
        scholarship.setMinGpa(request.getMinGpa());
        scholarship.setAwardAmount(request.getAwardAmount());
        scholarship.setTotalSlots(request.getTotalSlots());
        scholarship.setApplicationDeadline(request.getApplicationDeadline());
        return scholarshipRepository.save(scholarship);
    }

    @Override
    public Scholarship uploadImage(Long id, MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("No file was uploaded");
        }

        if (file.getSize() > 10 * 1024 * 1024) {
            throw new BadRequestException("File size must not exceed 10MB");
        }

        Scholarship scholarship = getById(id);

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalName = file.getOriginalFilename();
            String uniqueName = UUID.randomUUID() + "_" + originalName;
            Path filePath = uploadPath.resolve(uniqueName);
            file.transferTo(filePath);

            scholarship.setImageUrl(filePath.toString());

            return scholarshipRepository.save(scholarship);

        } catch (IOException e) {
            throw new BadRequestException("Failed to store image: " + e.getMessage());
        }
    }

    @Override
    public void deactivate(Long id) {
        Scholarship scholarship = getById(id);
        scholarship.setActive(false);
        scholarshipRepository.save(scholarship);
    }

    @Override
    public List<Scholarship> getByLevel(String level) {
        return scholarshipRepository.findByLevel(level);
    }

    @Override
    public List<Scholarship> getByLocation(String location) {
        return scholarshipRepository.findByLocationContainingIgnoreCase(location);
    }
}