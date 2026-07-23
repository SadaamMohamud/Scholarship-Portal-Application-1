package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.Entity.Award;
import com.Scholarship_Portal_Application.Entity.User;

import java.util.List;

public interface AwardService {

    Award issueAward(Long applicationId, String awardNote, User issuedBy);

    List<Award> getAwardsByStudent(Long studentId);

    Award getAwardByApplication(Long applicationId);

    List<Award> getAllAwards();

    Award getById(Long id);

    void delete(Long id);
}
