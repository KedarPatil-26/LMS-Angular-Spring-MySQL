package com.Eduline.LMS.course_categories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coursecategories")
public class CourseCategoryController {

	@Autowired
	private CourseCategoryService courseCategoryService;

	@CrossOrigin
	@GetMapping("/getall")
	public List<CourseCategory> getAllCategories() {
		return courseCategoryService.getAllCategories();
	}

	@CrossOrigin
	@GetMapping("/getbyid/{categoryId}")
	public ResponseEntity<CourseCategory> getCategoryById(@PathVariable int categoryId) {
		CourseCategory category = courseCategoryService.getCategoryById(categoryId);
		if (category == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(category);
	}

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<CourseCategory> addCategory(@RequestBody CourseCategory category) {
		CourseCategory newCategory = courseCategoryService.addCategory(category);
		return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
	}

	@CrossOrigin
	@PutMapping("/update/{categoryId}")
	public ResponseEntity<CourseCategory> updateCategory(@PathVariable int categoryId, @RequestBody CourseCategory category) {
		CourseCategory updatedCategory = courseCategoryService.updateCategory(categoryId, category);
		if (updatedCategory == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(updatedCategory);
	}

	@CrossOrigin
	@DeleteMapping("/delete/{categoryId}")
	public ResponseEntity<Void> deleteCategory(@PathVariable int categoryId) {
		courseCategoryService.deleteCategory(categoryId);
		return ResponseEntity.noContent().build();
	}
}