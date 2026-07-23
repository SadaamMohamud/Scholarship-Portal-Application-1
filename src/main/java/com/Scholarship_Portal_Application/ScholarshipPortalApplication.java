package com.Scholarship_Portal_Application;



import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class  ScholarshipPortalApplication {


	public static void main(String[] args) {
		SpringApplication.run(ScholarshipPortalApplication.class, args);
	}
}