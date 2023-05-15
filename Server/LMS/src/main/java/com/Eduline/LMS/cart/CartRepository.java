package com.Eduline.LMS.cart;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

	List<Cart> findByStudentId(Long studentId);

	List<Cart> findByCourseId(Long courseId);

	Cart findByCourseIdAndStudentId(Long courseId, Long studentID);

	void deleteByCourseIdAndStudentId(Long courseId, Long studentId);
}