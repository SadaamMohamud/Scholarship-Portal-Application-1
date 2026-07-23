package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.DTO.ContactRequestDTO;
import com.Scholarship_Portal_Application.DTO.ContactResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ContactServiceInterface {

    ContactResponseDTO submitContact(ContactRequestDTO requestDTO);

    Page<ContactResponseDTO> getAllContacts(Pageable pageable);

    ContactResponseDTO getContactById(Long id);

    void deleteContact(Long id);
}