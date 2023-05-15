package com.Eduline.LMS.course_materials;

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

@RestController
@RequestMapping("/api/coursematerial")
public class CourseMaterialController {

	@Autowired
	private CourseMaterialService courseMaterialService;

	@CrossOrigin
	@GetMapping("/getbycourseid/{courseId}")
	public ResponseEntity<List<CourseMaterial>> getCourseMaterialsByCourseId(@PathVariable Long courseId) {
		List<CourseMaterial> courseMaterials = courseMaterialService.getCourseMaterialsByCourseId(courseId);
		return new ResponseEntity<>(courseMaterials, HttpStatus.OK);
	}

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<CourseMaterial> addCourse(@RequestBody CourseMaterial courseMaterial) {
		CourseMaterial newCourseMaterial = courseMaterialService.addCourseMaterial(courseMaterial);
		return ResponseEntity.ok().body(newCourseMaterial);
	}


	@CrossOrigin
	@DeleteMapping("/delete/{materialId}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long materialId) {
		courseMaterialService.deleteCourseMaterialById(materialId);
		return ResponseEntity.noContent().build();
	}

	@CrossOrigin
	@DeleteMapping("/deletebycourse/{courseId}")
	public ResponseEntity<Void> deleteMaterialByCourse(@PathVariable long courseId) {
		courseMaterialService.deleteCourseMaterialByCourseId(courseId);
		return ResponseEntity.noContent().build();
	}

	@CrossOrigin
	@PutMapping("/update/{id}")
	public ResponseEntity<CourseMaterial> updateCourseMaterialById(@PathVariable Long id,
																   @RequestBody CourseMaterial courseMaterial) {
		CourseMaterial updatedCourseMaterial = courseMaterialService.updateCourseMaterialById(id, courseMaterial);
		return new ResponseEntity<>(updatedCourseMaterial, HttpStatus.OK);
	}

	@CrossOrigin
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
		String filePath = "C:\\Users\\Shranay\\Desktop\\LMS_Angular_Spring\\UploadedMedia\\Material\\" + file.getOriginalFilename();
		try {
			File dest = new File(filePath);
			file.transferTo(dest);
			return ResponseEntity.ok().body(filePath);
		} catch (IOException e) {
			return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
		}
	}


}