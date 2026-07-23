package com.Scholarship_Portal_Application.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "awards")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Award {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The application that was awarded
    @OneToOne
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    // The student who received the award
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    // The scholarship awarded
    @ManyToOne
    @JoinColumn(name = "scholarship_id", nullable = false)
    private Scholarship scholarship;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal awardAmount;

    @Column(length = 1000)
    private String awardNote;

    // Admin who issued the award
    @ManyToOne
    @JoinColumn(name = "issued_by", nullable = false)
    private User issuedBy;

    @Column(nullable = false)
    private LocalDateTime issuedAt = LocalDateTime.now();
}
