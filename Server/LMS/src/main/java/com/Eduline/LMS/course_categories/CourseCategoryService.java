package com.Eduline.LMS.course_categories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Eduline.LMS.courses.CourseService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CourseCategoryService {

	@Autowired
	private CourseCategoryRepository courseCategoryRepository;
	private CourseService courseService;

	public List<CourseCategory> getAllCategories() {
		return courseCategoryRepository.findAll();
	}

	public CourseCategory getCategoryById(int categoryId) {
		Optional<CourseCategory> result = courseCategoryRepository.findById(categoryId);
		return result.orElse(null);
	}

	public CourseCategory addCategory(CourseCategory category) {
		return courseCategoryRepository.save(category);
	}

	public CourseCategory updateCategory(int categoryId, CourseCategory category) {
		CourseCategory existingCategory = getCategoryById(categoryId);
		if (existingCategory == null) {
			return null;
		}
		existingCategory.setName(category.getName());
		return courseCategoryRepository.save(existingCategory);
	}

	@Transactional
	public void deleteCategory(int categoryId) {
		Long categoryIdLong = (long) categoryId;
		//courseService.deleteCoursesByCategoryId(categoryIdLong);
		courseCategoryRepository.deleteById(categoryId);
	}
}
