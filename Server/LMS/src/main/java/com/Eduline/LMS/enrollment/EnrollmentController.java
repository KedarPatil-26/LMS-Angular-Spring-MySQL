package com.Eduline.LMS.enrollment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollment")
public class EnrollmentController {

	@Autowired
	private EnrollmentService enrollmentService;

	@CrossOrigin
	@GetMapping("/getbystudentid/{studentId}")
	public ResponseEntity<List<Enrollment>> getCartsByStudentId(@PathVariable Long studentId) {
		List<Enrollment> enrollment = enrollmentService.findByStudentId(studentId);
		return new ResponseEntity<>(enrollment, HttpStatus.OK);
	}

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Enrollment> addCart(@RequestBody Enrollment cart) {
		Enrollment newEnrollment = enrollmentService.addCartByCourseAndStudent(cart.getCourseId(), cart.getStudentId());
		return new ResponseEntity<>(newEnrollment, HttpStatus.CREATED);
	}

	@CrossOrigin
	@GetMapping("/getbycourseid/{courseId}")
	public ResponseEntity<List<Enrollment>> getCartByCourseId(@PathVariable Long courseId) {
		List<Enrollment> enrollment = enrollmentService.findByCourseId(courseId);
		return new ResponseEntity<>(enrollment, HttpStatus.OK);
	}

	@CrossOrigin
	@GetMapping("/getbycourseandstudent/{courseId}/{studentId}")
	public ResponseEntity<Enrollment> getCartByCourseAndStudentId(@PathVariable Long courseId, @PathVariable Long studentId) {
		Enrollment enrollment = enrollmentService.findByCourseIdAndStudentId(courseId, studentId);
		return new ResponseEntity<>(enrollment, HttpStatus.OK);
	}

	@CrossOrigin
	@DeleteMapping("/delete/{courseId}/{studentId}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long courseId, @PathVariable Long studentId) {
		enrollmentService.deleteEnrollmentByCourseIdAndStudentId(courseId, studentId);
		return ResponseEntity.noContent().build();
	}

}