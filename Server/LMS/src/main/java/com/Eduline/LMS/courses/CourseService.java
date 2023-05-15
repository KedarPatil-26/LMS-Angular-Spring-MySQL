package com.Eduline.LMS.courses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import com.Eduline.LMS.course_materials.*;

import javax.transaction.Transactional;

@Service
public class CourseService {

	@Autowired
	private CourseRepository courseRepository;
	private CourseMaterialService courseMaterialService;

	public List<Course> getAllCourses(){
		return courseRepository.findAll();
	}

	public Course addCourse(Course course) {
		return courseRepository.save(course);
	}

	public String uploadFile(MultipartFile file) throws Exception {
		// Specify the directory where the file will be saved
		String directory = "http://127.0.0.1:8887/Thumbnails";

		// Create the directory if it doesn't exist
		Path path = Paths.get(directory);
		if (!Files.exists(path)) {
			Files.createDirectories(path);
		}

		// Get the original file name and generate a new unique file name
		String originalFileName = file.getOriginalFilename();
		String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;

		// Save the file to the specified directory with the unique file name
		Path filePath = Paths.get(directory + uniqueFileName);
		Files.write(filePath, file.getBytes());

		// Return the URL of the saved file
		String serverUrl = "http://127.0.0.1:8887/"; // Change this to the URL of your web server
		return serverUrl + uniqueFileName;
	}

	public List<Course> getAllUnpublishedCoursesByInstructorId(Long instructorId) {
		return courseRepository.findByIsPublishedFalseAndInstructorId(instructorId);
	}

	public Optional<Course> getCoursesById(Long Id) {
		return courseRepository.findById(Id);
	}

	public List<Course> getAllPublishedCoursesByInstructorId(Long instructorId) {
		return courseRepository.findByIsPublishedTrueAndInstructorId(instructorId);
	}

	public List<Course> getAllUnpublishedAndUndeletedCoursesByInstructorId(Long instructorId) {
		return courseRepository.findByIsPublishedFalseAndIsDeletedFalseAndInstructorId(instructorId);
	}

	public List<Course> getAllPublishedAndUndeletedCoursesByInstructorId(Long instructorId) {
		return courseRepository.findByIsPublishedTrueAndIsDeletedFalseAndInstructorId(instructorId);
	}

	public Course updateIsPublishedById(Long courseId, boolean isPublished) {
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new RuntimeException("Course not found"));
		course.setIsPublished(isPublished);
		updateIsAuthorizedById(courseId, false);
		return courseRepository.save(course);
	}

	public Course updateIsDeletedById(Long courseId, boolean isDeleted) {
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new RuntimeException("Course not found"));
		course.setIsDeleted(isDeleted);
		return courseRepository.save(course);
	}

	public Course updateIsAuthorizedById(Long courseId, boolean isAuthorized) {
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new RuntimeException("Course not found"));
		course.setIsAuthorized(isAuthorized);
		return courseRepository.save(course);
	}

	public Course updateCourseById(Long courseId, Course updatedCourse) {
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new RuntimeException("Course not found"));

		// Update the course with the new information
		course.setTitle(updatedCourse.getTitle());
		course.setDescription(updatedCourse.getDescription());
		course.setKeywords(updatedCourse.getKeywords());
		course.setThumbnail(updatedCourse.getThumbnail());
		course.setCategoryId(updatedCourse.getCategoryId());
		course.setPrice(updatedCourse.getPrice());
		course.setIsAuthorized(false);

		return courseRepository.save(course);
	}

	public List<Course> getAllCoursesByCategoryId(Long categoryId) {
		return courseRepository.findByCategoryId(categoryId);
	}

	@Transactional
	public void deleteCoursesByCategoryId(Long categoryId) {
		List<Course> courses = courseRepository.findByCategoryId(categoryId);
		for (Course course : courses) {
			System.out.println(course.getId());
			courseMaterialService.deleteCourseMaterialByCourseId(course.getId());
		}
		courseRepository.deleteAll(courses);
	}

	public List<Course> getAllPublishedCourses() {
		return courseRepository.findByIsPublishedTrue();
	}

	public List<Course> getAllPublishedCoursesByCategoryId(Long categoryId) {
		return courseRepository.findByIsPublishedTrueAndCategoryId(categoryId);
	}

	public List<Course> getAllAuthorizedAndUndeletedCourses() {
		return courseRepository.findByIsAuthorizedTrueAndIsDeletedFalse();
	}

	public List<Course> getAllUnauthorizedAndUndeletedCourses() {
		return courseRepository.findByIsAuthorizedFalseAndIsDeletedFalse();
	}

	public List<Course> getAuthorizedAndUndeletedCourseByCategoryId(Long categoryId) {
		return courseRepository.findByIsAuthorizedTrueAndIsDeletedFalseAndCategoryId(categoryId);
	}
}
