package com.Eduline.LMS.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

	@Autowired
	private CourseService courseService;

	@CrossOrigin
	@GetMapping("/getall")
	public List<Course> getAllCourses() {
		return courseService.getAllCourses();
	}

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Course> addCourse(@RequestBody Course course) {
		Course newCourse = courseService.addCourse(course);
		return ResponseEntity.ok().body(newCourse);
	}

	@CrossOrigin
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
		String directory = "C:\\Users\\Shranay\\Desktop\\LMS_Angular_Spring\\UploadedMedia\\Thumbnails";
		String filename = file.getOriginalFilename();
		Path filepath = Paths.get(directory, filename);
		try {
			Files.write(filepath, file.getBytes());
			return ResponseEntity.ok().body(filepath.toString());
		} catch (IOException e) {
			return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
		}
	}

	@CrossOrigin
	@GetMapping("/unpublished/{instructorId}")
	public List<Course> getAllUnpublishedAndUndeletedCoursesByInstructorId(@PathVariable Long instructorId) {
		return courseService.getAllUnpublishedAndUndeletedCoursesByInstructorId(instructorId);
	}

	@CrossOrigin
	@DeleteMapping("/deletebycategory/{categoryId}")
	public ResponseEntity<Void> deleteCourseByCategory(@PathVariable long categoryId) {
		courseService.deleteCoursesByCategoryId(categoryId);
		return ResponseEntity.noContent().build();
	}

	@CrossOrigin
	@GetMapping("/published/{instructorId}")
	public List<Course> getAllPublishedAndUndeletedCoursesByInstructorId(@PathVariable Long instructorId) {
		return courseService.getAllPublishedAndUndeletedCoursesByInstructorId(instructorId);
	}

	@CrossOrigin
	@PutMapping("/{id}/publish")
	public ResponseEntity<Course> updateIsPublished(@PathVariable Long id, @RequestBody Course request) {
		Course updatedCourse = courseService.updateIsPublishedById(id, request.getIsPublished());
		return ResponseEntity.ok(updatedCourse);
	}

	@CrossOrigin
	@PutMapping("/{id}/delete")
	public ResponseEntity<Course> updateIsDeleted(@PathVariable Long id, @RequestBody Course request) {
		Course updatedCourse = courseService.updateIsDeletedById(id, request.getIsDeleted());
		return ResponseEntity.ok(updatedCourse);
	}

	@CrossOrigin
	@PutMapping("/{id}/authorize")
	public ResponseEntity<Course> updateIsAuthorized(@PathVariable Long id, @RequestBody Course request) {
		Course updatedCourse = courseService.updateIsAuthorizedById(id, request.getIsAuthorized());
		return ResponseEntity.ok(updatedCourse);
	}

	@CrossOrigin
	@PutMapping("/update/{courseId}")
	public ResponseEntity<Course> updateCourseById(@PathVariable Long courseId, @RequestBody Course course) {
		Course updatedCourse = courseService.updateCourseById(courseId, course);
		return new ResponseEntity<>(updatedCourse, HttpStatus.OK);
	}

	@CrossOrigin
	@GetMapping("/category/{categoryId}")
	public List<Course> getCoursesByCategoryId(@PathVariable Long categoryId) {
		return courseService.getAllCoursesByCategoryId(categoryId);
	}

	@CrossOrigin
	@GetMapping("/getallpublished")
	public List<Course> getAllPublishedCourses() {
		return courseService.getAllPublishedCourses();
	}

	@CrossOrigin
	@GetMapping("/getpublishedbycategory/{categoryId}")
	public List<Course> getAllPublishedCoursesByCategoryId(@PathVariable Long categoryId) {
		return courseService.getAllPublishedCoursesByCategoryId(categoryId);
	}

	@CrossOrigin
	@GetMapping("/getbyid/{Id}")
	public Optional<Course> getCoursesById(@PathVariable Long Id) {
		return courseService.getCoursesById(Id);
	}

	@CrossOrigin
	@GetMapping("/getallauthorizedandundeleted")
	public List<Course> getAllAuthorizedandundeletedCourses() {
		return courseService.getAllAuthorizedAndUndeletedCourses();
	}

	@CrossOrigin
	@GetMapping("/getallunauthorizedandundeleted")
	public List<Course> getAllUnauthorizedandundeletedCourses() {
		return courseService.getAllUnauthorizedAndUndeletedCourses();
	}


	@CrossOrigin
	@GetMapping("/getauthorizedandundeletedbycategory/{categoryId}")
	public List<Course> getAllAuthorizedAndUndeletedCoursesByCategoryId(@PathVariable Long categoryId) {
		return courseService.getAuthorizedAndUndeletedCourseByCategoryId(categoryId);
	}


}
