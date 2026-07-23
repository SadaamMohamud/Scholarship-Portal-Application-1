package com.Scholarship_Portal_Application.Config;



import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
    // Enables @Async on service methods
    // Used by NotificationService to send emails without blocking the main thread
}
