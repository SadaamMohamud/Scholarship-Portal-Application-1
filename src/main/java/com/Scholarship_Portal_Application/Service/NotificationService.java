package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.Award;

public interface NotificationService {

    void sendSubmissionReceipt(Application application);

    void sendStatusUpdate(Application application);

    void sendAwardNotification(Award award);
}
