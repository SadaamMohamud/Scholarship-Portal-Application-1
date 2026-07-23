package com.Scholarship_Portal_Application.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponseDTO {

    private long totalScholarships;
    private long totalApplications;
    private long submittedApplications;
    private long underReviewApplications;
    private long rejectedApplications;
    private long awardedApplications;
    private long totalStudents;
    private long totalCommitteeMembers;
    private long newApplicationsThisMonth;
    private double avgScorePerApplication;
}
