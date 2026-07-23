package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.DTO.ApplicationRequestDTO;
import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.Scholarship;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.ScholarshipRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final NotificationService notificationService;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  ScholarshipRepository scholarshipRepository,
                                  NotificationService notificationService) {
        this.applicationRepository = applicationRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.notificationService = notificationService;
    }

    @Override
    public Application submitApplication(User student, ApplicationRequestDTO dto) {

        Scholarship scholarship = scholarshipRepository.findById(dto.getScholarshipId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Scholarship not found with id: " + dto.getScholarshipId()));

        // Prevent duplicate applications
        boolean alreadyApplied = applicationRepository
                .existsByStudentIdAndScholarshipId(student.getId(), dto.getScholarshipId());
        if (alreadyApplied) {
            throw new BadRequestException("You have already applied for this scholarship");
        }

        Application application = new Application();
        application.setStudent(student);
        application.setScholarship(scholarship);
        application.setPersonalStatement(dto.getPersonalStatement());
        application.setStatus(ApplicationStatus.SUBMITTED);

        Application saved = applicationRepository.save(application);

        // Email the student a submission receipt
        notificationService.sendSubmissionReceipt(saved);

        return saved;
    }

    @Override
    public List<Application> getMyApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    @Override
    public List<Application> getByScholarship(Long scholarshipId) {
        return applicationRepository.findByScholarshipId(scholarshipId);
    }

    @Override
    public List<Application> getByStatus(ApplicationStatus status) {
        return applicationRepository.findByStatus(status);
    }

    @Override
    public Application getById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + id));
    }

    @Override
    public Application updateStatus(Long id, ApplicationStatus newStatus) {
        Application application = getById(id);
        application.setStatus(newStatus);
        Application saved = applicationRepository.save(application);

        // Email the student whenever their status changes
        notificationService.sendStatusUpdate(saved);

        return saved;
    }

    @Override
    public void withdraw(Long id, Long studentId) {
        Application application = getById(id);

        // Only owner can withdraw
        if (!application.getStudent().getId().equals(studentId)) {
            throw new BadRequestException("You can only withdraw your own application");
        }

        // Cannot withdraw if already under review
        if (application.getStatus() != ApplicationStatus.SUBMITTED) {
            throw new BadRequestException("You can only withdraw applications that are still in SUBMITTED status");
        }

        applicationRepository.delete(application);
    }
}