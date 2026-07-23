package com.Scholarship_Portal_Application.Exception;

public class ContactNotFoundException extends ResourceNotFoundException {

    public ContactNotFoundException(Long id) {
        super("Contact not found with id: " + id);
    }

    public ContactNotFoundException(String message) {
        super(message);
    }
}