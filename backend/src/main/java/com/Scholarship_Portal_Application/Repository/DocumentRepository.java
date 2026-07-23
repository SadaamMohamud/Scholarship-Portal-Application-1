package com.Scholarship_Portal_Application.Repository;



import com.Scholarship_Portal_Application.Entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByApplicationId(Long applicationId);
}
