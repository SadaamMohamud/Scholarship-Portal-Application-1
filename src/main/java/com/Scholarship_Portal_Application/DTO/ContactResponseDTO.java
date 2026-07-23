package com.Scholarship_Portal_Application.DTO;

import com.Scholarship_Portal_Application.Enum.ContactSubject;
import lombok.*;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
@Data
public class ContactResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private ContactSubject subject;
    private String message;
    private LocalDateTime createdAt;
}