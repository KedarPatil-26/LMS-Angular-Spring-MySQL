package com.Eduline.LMS.courses;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {

	List<Course> findByIsPublishedFalseAndInstructorId(Long instructorId);

	List<Course> findByIsPublishedTrueAndInstructorId(Long instructorId);

	List<Course> findByIsPublishedFalseAndIsDeletedFalseAndInstructorId(Long instructorId);

	List<Course> findByIsPublishedTrueAndIsDeletedFalseAndInstructorId(Long instructorId);

	List<Course> findByCategoryId(Long categoryId);

	List<Course> findByIsPublishedTrue();

	List<Course> findByIsPublishedTrueAndCategoryId(Long categoryId);

	List<Course> findByIsAuthorizedTrueAndIsDeletedFalse();

	List<Course> findByIsAuthorizedFalseAndIsDeletedFalse();

	List<Course> findByIsAuthorizedTrueAndIsDeletedFalseAndCategoryId(Long categoryId);



}