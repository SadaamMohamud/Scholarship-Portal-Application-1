package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.Entity.StatusHistory;
import com.Scholarship_Portal_Application.Entity.User;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;

import java.util.List;

public interface StatusHistoryService {

    StatusHistory recordStatusChange(Long applicationId,
                                     ApplicationStatus previousStatus,
                                     ApplicationStatus newStatus,
                                     User changedBy,
                                     String note);

    List<StatusHistory> getHistoryByApplication(Long applicationId);

    ApplicationStatus getCurrentStatus(Long applicationId);
}
