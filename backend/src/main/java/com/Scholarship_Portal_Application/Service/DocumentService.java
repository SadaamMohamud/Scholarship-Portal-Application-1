package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.Entity.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DocumentService {

    Document uploadDocument(Long applicationId, String documentType, MultipartFile file);

    List<Document> getByApplication(Long applicationId);

    Document getById(Long id);

    void delete(Long id);



}
