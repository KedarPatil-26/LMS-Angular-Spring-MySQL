package com.Eduline.LMS.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/student")
public class StudentController {

	private final StudentService studentService;

	@Autowired
	public StudentController(StudentService studentService) {
		this.studentService = studentService;
	}

	@CrossOrigin
	@PostMapping("/register")
	public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
		Student registeredStudent = studentService.register(student);
		return ResponseEntity.status(HttpStatus.CREATED).body(registeredStudent);
	}

	@CrossOrigin
	@PostMapping("/update")
	public ResponseEntity<Student> updateStudent(@RequestBody Student updatedStudent) {
		Integer id = updatedStudent.getId();
		String name = updatedStudent.getName();
		String email = updatedStudent.getEmail();
		String password = updatedStudent.getPassword();

		Student updated = studentService.updateByID(id, name, email, password);
		return ResponseEntity.ok(updated);
	}

	@CrossOrigin
	@PutMapping("/block")
	public Student updateIsBlocked(@RequestBody Student student) {
		Integer id = student.getId();
		boolean isBlocked = student.isBlocked();

		Student updatedStudent = studentService.updateIsBlockedById(id, isBlocked);

		return updatedStudent;
	}

	@CrossOrigin
	@GetMapping("/getall")
	public List<Student> getAllStudents() {
		return studentService.getAllStudents();
	}

}