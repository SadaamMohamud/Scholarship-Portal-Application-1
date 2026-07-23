package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.Award;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.AwardRepository;
import com.Scholarship_Portal_Application.Service.AwardService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AwardServiceImpl implements AwardService {

    private final AwardRepository awardRepository;
    private final ApplicationRepository applicationRepository;
    private final NotificationService notificationService;

    public AwardServiceImpl(AwardRepository awardRepository,
                            ApplicationRepository applicationRepository,
                            NotificationService notificationService) {
        this.awardRepository = awardRepository;
        this.applicationRepository = applicationRepository;
        this.notificationService = notificationService;
    }

    @Override
    @Transactional
    public Award issueAward(Long applicationId, String awardNote, User issuedBy) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + applicationId));

        if (application.getStatus() == ApplicationStatus.AWARDED) {
            throw new BadRequestException("This application has already been awarded");
        }

        // Belt-and-braces check: catches the case where an Award row already
        // exists for this application even if the status field says otherwise
        // (e.g. status was manually changed back after awarding).
        if (awardRepository.findByApplicationId(applicationId).isPresent()) {
            throw new BadRequestException("An award already exists for this application. " +
                    "Delete the existing award first if you need to re-issue it.");
        }

        application.setStatus(ApplicationStatus.AWARDED);
        applicationRepository.save(application);

        Award award = new Award();
        award.setApplication(application);
        award.setStudent(application.getStudent());
        award.setScholarship(application.getScholarship());
        award.setAwardAmount(application.getScholarship().getAwardAmount());
        award.setAwardNote(awardNote);
        award.setIssuedBy(issuedBy);

        Award savedAward = awardRepository.save(award);

        // Email the student now that the award is confirmed and saved
        notificationService.sendAwardNotification(savedAward);

        return savedAward;
    }

    @Override
    public List<Award> getAwardsByStudent(Long studentId) {
        return awardRepository.findByStudentId(studentId);
    }

    @Override
    public Award getAwardByApplication(Long applicationId) {
        return awardRepository.findByApplicationId(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Award not found for application id: " + applicationId));
    }

    @Override
    public List<Award> getAllAwards() {
        return awardRepository.findAll();
    }

    @Override
    public Award getById(Long id) {
        return awardRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Award not found with id: " + id));
    }

    @Override
    public void delete(Long id) {
        Award award = getById(id);
        awardRepository.delete(award);
    }
}