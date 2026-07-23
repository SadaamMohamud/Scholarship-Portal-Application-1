package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.DTO.ApplicationRequestDTO;
import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;

import java.util.List;

public interface ApplicationService {

    Application submitApplication(User student, ApplicationRequestDTO dto);

    List<Application> getMyApplications(Long studentId);

    List<Application> getByScholarship(Long scholarshipId);

    List<Application> getByStatus(ApplicationStatus status);

    Application getById(Long id);

    Application updateStatus(Long id, ApplicationStatus newStatus);

    void withdraw(Long id, Long studentId);
}
