package com.Eduline.LMS.common;

import com.Eduline.LMS.admin.Admin;
import com.Eduline.LMS.admin.AdminRepository;
import com.Eduline.LMS.instructor.Instructor;
import com.Eduline.LMS.instructor.InstructorRepository;
import com.Eduline.LMS.student.Student;
import com.Eduline.LMS.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
	@Autowired
	private AdminRepository adminRepository;

	@Autowired
	private InstructorRepository instructorRepository;

	@Autowired
	private StudentRepository studentRepository;

	public Object login(String email, String password) {
		Admin admin = adminRepository.findByEmail(email);
		if (admin != null && admin.getPassword().equals(password)) {
			return new LoginResponse(admin, "admin");
		}

		Instructor instructor = instructorRepository.findByEmail(email);
		if (instructor != null && instructor.getPassword().equals(password)) {
			return new LoginResponse(instructor, "instructor");
		}

		Student student = studentRepository.findByEmail(email);
		if (student != null && student.getPassword().equals(password)) {
			return new LoginResponse(student, "student");
		}

		return "No Email found";
	}
}