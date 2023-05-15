package com.Eduline.LMS.instructor;

import com.Eduline.LMS.student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
public class InstructorService {

	@Autowired
	private InstructorRepository instructorRepository;

	private EntityManager entityManager;

	public Instructor register(Instructor instructor) {
		// Check if student already exists
		if (instructorRepository.findByEmail(instructor.getEmail()) != null) {
			throw new RuntimeException("Email already in use");
		}

		// Save student to database
		Instructor newInstructor = new Instructor();
		newInstructor.setName(instructor.getName());
		newInstructor.setEmail(instructor.getEmail());
		newInstructor.setPassword(instructor.getPassword());
		newInstructor.setBlocked(instructor.isBlocked());
		newInstructor.setAuthorized(instructor.isAuthorized());

		// Save student to database
		return instructorRepository.save(newInstructor);
	}

	public Instructor updateByID(Integer id, String name, String email, String password) {
		// Check if student exists
		Instructor instructor = instructorRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Instructor not found"));

		// Update student fields
		instructor.setName(name);
		instructor.setEmail(email);
		instructor.setPassword(password);

		// Save updated student to database
		return instructorRepository.save(instructor);
	}

	public Instructor updateIsBlockedById(Integer id, boolean isBlocked) {
		Instructor instructor = instructorRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Instructor not found"));
		instructor.setBlocked(isBlocked);

		return instructorRepository.save(instructor);
	}

	public Instructor updateIsAuthorizedById(Integer id, boolean isAuthorized) {
		Instructor instructor = instructorRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Instructor not found"));
		instructor.setAuthorized(isAuthorized);

		return instructorRepository.save(instructor);
	}

	public List<Instructor> getAllInstructors() {
		return instructorRepository.findAll();
	}

	public List<Instructor> findAllAuthorizedInstructors() {
		return instructorRepository.findByIsAuthorized(true);
	}

	public List<Instructor> findAllUnauthorizedInstructors() {
		return instructorRepository.findByIsAuthorized(false);
	}
}