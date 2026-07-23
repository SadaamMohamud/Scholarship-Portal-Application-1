package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.Entity.Application;
import com.Scholarship_Portal_Application.Entity.Document;
import com.Scholarship_Portal_Application.Enum.DocumentType;
import com.Scholarship_Portal_Application.Exception.BadRequestException;
import com.Scholarship_Portal_Application.Exception.ResourceNotFoundException;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.DocumentRepository;
import com.Scholarship_Portal_Application.Service.DocumentService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final ApplicationRepository applicationRepository;
    private final String UPLOAD_DIR = "uploads/documents/";

    public DocumentServiceImpl(DocumentRepository documentRepository,
                               ApplicationRepository applicationRepository) {
        this.documentRepository = documentRepository;
        this.applicationRepository = applicationRepository;
    }

    @Override
    public Document uploadDocument(Long applicationId, String documentType, MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new BadRequestException("No file was uploaded");
        }

        // Validate file size max 10MB
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new BadRequestException("File size must not exceed 10MB");
        }

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found with id: " + applicationId));

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalName = file.getOriginalFilename();
            String uniqueName = UUID.randomUUID() + "_" + originalName;
            Path filePath = uploadPath.resolve(uniqueName);
            file.transferTo(filePath);

            Document document = new Document();
            document.setApplication(application);
            document.setDocumentName(originalName);
            document.setDocumentType(DocumentType.valueOf(documentType));
            document.setFilePath(filePath.toString());

            return documentRepository.save(document);

        } catch (IOException e) {
            throw new BadRequestException("Failed to store file: " + e.getMessage());
        }
    }

    @Override
    public List<Document> getByApplication(Long applicationId) {
        return documentRepository.findByApplicationId(applicationId);
    }

    @Override
    public Document getById(Long id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Document not found with id: " + id));
    }

    @Override
    public void delete(Long id) {
        Document document = getById(id);
        // Delete from disk
        try {
            Files.deleteIfExists(Paths.get(document.getFilePath()));
        } catch (IOException e) {
            throw new BadRequestException("Failed to delete file: " + e.getMessage());
        }
        documentRepository.delete(document);

    }
}
