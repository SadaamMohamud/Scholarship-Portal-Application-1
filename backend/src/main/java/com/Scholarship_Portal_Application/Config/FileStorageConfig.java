package com.Scholarship_Portal_Application.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FileStorageConfig {

    @Value("${file.upload-dir:uploads/documents}")
    private String uploadDir;

    public String getUploadDir() {
        return uploadDir;
    }
}
