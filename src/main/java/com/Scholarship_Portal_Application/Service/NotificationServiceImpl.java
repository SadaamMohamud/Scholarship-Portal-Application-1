package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.Award;
import com.Scholarship_Portal_Application.Service.NotificationService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;

    public NotificationServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    @Override
    public void sendSubmissionReceipt(Application application) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(application.getStudent().getEmail());
        message.setSubject("Application Received — " + application.getScholarship().getTitle());
        message.setText(
                "Dear " + application.getStudent().getFullName() + ",\n\n" +
                        "Your application for \"" + application.getScholarship().getTitle() + "\" has been received.\n" +
                        "Application ID: " + application.getId() + "\n\n" +
                        "We will notify you when your application is under review.\n\n" +
                        "Best regards,\nScholarship Portal Team"
        );
        mailSender.send(message);
    }

    @Async
    @Override
    public void sendStatusUpdate(Application application) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(application.getStudent().getEmail());
        message.setSubject("Application Status Update — " + application.getScholarship().getTitle());
        message.setText(
                "Dear " + application.getStudent().getFullName() + ",\n\n" +
                        "Your application for \"" + application.getScholarship().getTitle() + "\" status has been updated.\n" +
                        "Current Status: " + application.getStatus().name() + "\n\n" +
                        "Login to your account to view full details.\n\n" +
                        "Best regards,\nScholarship Portal Team"
        );
        mailSender.send(message);
    }

    @Async
    @Override
    public void sendAwardNotification(Award award) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(award.getStudent().getEmail());
        message.setSubject("Congratulations! — " + award.getScholarship().getTitle());
        message.setText(
                "Dear " + award.getStudent().getFullName() + ",\n\n" +
                        "Congratulations! You have been awarded the \"" + award.getScholarship().getTitle() + "\" scholarship.\n" +
                        "Award Amount: $" + award.getAwardAmount() + "\n\n" +
                        "Please login to your account to view your award details.\n\n" +
                        "Best regards,\nScholarship Portal Team"
        );
        mailSender.send(message);
    }
}