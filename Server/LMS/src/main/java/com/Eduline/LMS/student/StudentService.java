package com.Eduline.LMS.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class StudentService {

	@Autowired
	private StudentRepository studentRepository;

	private EntityManager entityManager;

	public Student register(Student student) {
		// Check if student already exists
		if (studentRepository.findByEmail(student.getEmail()) != null) {
			throw new RuntimeException("Email already in use");
		}

		// Save student to database
		Student newStudent = new Student();
		newStudent.setName(student.getName());
		newStudent.setEmail(student.getEmail());
		newStudent.setPassword(student.getPassword());
		newStudent.setBlocked(student.isBlocked());

		// Save student to database
		return studentRepository.save(newStudent);
	}

	public Student updateByID(Integer id, String name, String email, String password) {
		// Check if student exists
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Student not found"));

		// Update student fields
		student.setName(name);
		student.setEmail(email);
		student.setPassword(password);

		// Save updated student to database
		return studentRepository.save(student);
	}

	public Student updateIsBlockedById(Integer id, boolean isBlocked) {
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Student not found"));
		student.setBlocked(isBlocked);

		return studentRepository.save(student);
	}

	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

}