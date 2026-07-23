package com.Scholarship_Portal_Application.Service;

import com.Scholarship_Portal_Application.DTO.ContactRequestDTO;
import com.Scholarship_Portal_Application.DTO.ContactResponseDTO;
import com.Scholarship_Portal_Application.Entity.Contact;
import com.Scholarship_Portal_Application.Exception.ContactNotFoundException;
import com.Scholarship_Portal_Application.Repository.ContactRepository;
import com.Scholarship_Portal_Application.Service.ContactServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ContactServiceImpl implements ContactServiceInterface {

    private final ContactRepository contactRepository;

    @Override
    public ContactResponseDTO submitContact(ContactRequestDTO requestDTO) {

        // ---- DTO → Entity (manual mapping) ----
        Contact contact = Contact.builder()
                .fullName(requestDTO.getFullName())
                .email(requestDTO.getEmail())
                .subject(requestDTO.getSubject())
                .message(requestDTO.getMessage())
                .build();

        Contact savedContact = contactRepository.save(contact);

        // ---- Entity → DTO (manual mapping) ----
        return mapToResponseDTO(savedContact);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ContactResponseDTO> getAllContacts(Pageable pageable) {
        return contactRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::mapToResponseDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public ContactResponseDTO getContactById(Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException(id));
        return mapToResponseDTO(contact);
    }

    @Override
    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ContactNotFoundException(id);
        }
        contactRepository.deleteById(id);
    }

    // ---- Private helper: Entity → ResponseDTO ----
    private ContactResponseDTO mapToResponseDTO(Contact contact) {
        return ContactResponseDTO.builder()
                .id(contact.getId())
                .fullName(contact.getFullName())
                .email(contact.getEmail())
                .subject(contact.getSubject())
                .message(contact.getMessage())
                .createdAt(contact.getCreatedAt())
                .build();
    }
}