package com.Scholarship_Portal_Application.Service;



import com.Scholarship_Portal_Application.DTO.CategoryStatsResponseDTO;
import com.Scholarship_Portal_Application.DTO.DashboardResponseDTO;
import com.Scholarship_Portal_Application.Enum.Role;
import com.Scholarship_Portal_Application.Enum.ApplicationStatus;
import com.Scholarship_Portal_Application.Repository.ApplicationRepository;
import com.Scholarship_Portal_Application.Repository.AwardRepository;
import com.Scholarship_Portal_Application.Repository.ReviewRepository;
import com.Scholarship_Portal_Application.Repository.ScholarshipRepository;
import com.Scholarship_Portal_Application.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final ApplicationRepository applicationRepository;
    private final ScholarshipRepository scholarshipRepository;
    private final UserRepository userRepository;
    private final ReviewRepository reviewRepository;
    private final AwardRepository awardRepository;

    public DashboardServiceImpl(ApplicationRepository applicationRepository,
                                ScholarshipRepository scholarshipRepository,
                                UserRepository userRepository,
                                ReviewRepository reviewRepository,
                                AwardRepository awardRepository) {
        this.applicationRepository = applicationRepository;
        this.scholarshipRepository = scholarshipRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.awardRepository = awardRepository;
    }

    @Override
    public DashboardResponseDTO getKpiSummary() {

        long totalScholarships = scholarshipRepository.count();
        long totalApplications = applicationRepository.count();
        long submitted = applicationRepository.findByStatus(ApplicationStatus.SUBMITTED).size();
        long underReview = applicationRepository.findByStatus(ApplicationStatus.UNDER_REVIEW).size();
        long rejected = applicationRepository.findByStatus(ApplicationStatus.REJECTED).size();
        long awarded = applicationRepository.findByStatus(ApplicationStatus.AWARDED).size();
        long totalStudents = userRepository.countByRole(Role.ROLE_STUDENT);
        long totalCommittee = userRepository.countByRole(Role.ROLE_COMMITTEE);

        // Total awarded amount
        double totalAwardedAmount = awardRepository.findAll()
                .stream()
                .mapToDouble(a -> a.getAwardAmount().doubleValue())
                .sum();

        // Average score
        double avgScore = reviewRepository.findAll()
                .stream()
                .mapToInt(r -> r.getScore())
                .average()
                .orElse(0.0);

        return new DashboardResponseDTO(
                totalScholarships,
                totalApplications,
                submitted,
                underReview,
                rejected,
                awarded,
                totalStudents,
                totalCommittee,
                0,
                avgScore
        );
    }

    @Override
    public List<CategoryStatsResponseDTO> getCategoryStats() {
        return scholarshipRepository.findAll().stream()
                .collect(Collectors.groupingBy(s -> s.getCategory()))
                .entrySet().stream()
                .map(entry -> new CategoryStatsResponseDTO(
                        entry.getKey(),
                        entry.getValue().size(),
                        entry.getValue().stream()
                                .mapToInt(s -> applicationRepository.findByScholarshipId(s.getId()).size())
                                .sum()
                ))
                .collect(Collectors.toList());
    }
}
