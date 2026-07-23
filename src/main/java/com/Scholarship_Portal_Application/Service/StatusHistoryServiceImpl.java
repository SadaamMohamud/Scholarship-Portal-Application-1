package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.StatusHistory;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.StatusHistoryRepository;
import com.Scholarship_Portal_Application.Service.StatusHistoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StatusHistoryServiceImpl implements StatusHistoryService {

    private final StatusHistoryRepository statusHistoryRepository;
    private final ApplicationRepository applicationRepository;

    public StatusHistoryServiceImpl(StatusHistoryRepository statusHistoryRepository,
                                    ApplicationRepository applicationRepository) {
        this.statusHistoryRepository = statusHistoryRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public StatusHistory recordStatusChange(Long applicationId,
                                            ApplicationStatus previousStatus,
                                            ApplicationStatus newStatus,
                                            User changedBy,
                                            String note) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + applicationId));

        StatusHistory history = new StatusHistory();
        history.setApplication(application);
        history.setPreviousStatus(previousStatus);
        history.setNewStatus(newStatus);
        history.setChangedBy(changedBy);
        history.setNote(note);

        return statusHistoryRepository.save(history);
    }

    @Override
    public List<StatusHistory> getHistoryByApplication(Long applicationId) {
        return statusHistoryRepository
                .findByApplicationIdOrderByChangedAtAsc(applicationId);
    }

    @Override
    public ApplicationStatus getCurrentStatus(Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + applicationId));
        return application.getStatus();
    }
}