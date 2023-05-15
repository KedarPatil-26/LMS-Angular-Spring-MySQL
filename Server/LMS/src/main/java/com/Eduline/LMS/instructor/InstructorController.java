package com.Eduline.LMS.instructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instructor")
public class InstructorController {

	private final InstructorService instructorService;

	@Autowired
	public InstructorController(InstructorService instructorService) {
		this.instructorService = instructorService;
	}

	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<Instructor> registerStudent(@RequestBody Instructor instructor) {
		Instructor registeredInstructor = instructorService.register(instructor);
		return ResponseEntity.status(HttpStatus.CREATED).body(registeredInstructor);
	}

	@CrossOrigin
	@PostMapping("/update")
	public ResponseEntity<Instructor> updateStudent(@RequestBody Instructor updatedInstructor) {
		Integer id = updatedInstructor.getId();
		String name = updatedInstructor.getName();
		String email = updatedInstructor.getEmail();
		String password = updatedInstructor.getPassword();

		Instructor updated = instructorService.updateByID(id, name, email, password);
		return ResponseEntity.ok(updated);
	}

	@CrossOrigin
	@PutMapping("/block")
	public Instructor updateIsBlocked(@RequestBody Instructor instructor) {
		Integer id = instructor.getId();
		boolean isBlocked = instructor.isBlocked();

		Instructor updatedInstructor = instructorService.updateIsBlockedById(id, isBlocked);

		return updatedInstructor;
	}

	@CrossOrigin
	@PutMapping("/authorize")
	public Instructor updateIsAuthorized(@RequestBody Instructor instructor) {
		Integer id = instructor.getId();
		boolean isAuthorized = instructor.isAuthorized();

		Instructor updatedInstructor = instructorService.updateIsAuthorizedById(id, isAuthorized);

		return updatedInstructor;
	}

	@CrossOrigin
	@GetMapping("/getall")
	public List<Instructor> getAllInstructors() {
		return instructorService.getAllInstructors();
	}

	@CrossOrigin
	@GetMapping("/getunauthorized")
	public List<Instructor> getUnauthorizedInstructors() {
		return instructorService.findAllUnauthorizedInstructors();
	}

	@CrossOrigin
	@GetMapping("/getauthorized")
	public List<Instructor> getAuthorizedInstructors() {
		return instructorService.findAllAuthorizedInstructors();
	}

}