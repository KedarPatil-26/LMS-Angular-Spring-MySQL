package com.Eduline.LMS.enrollment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class EnrollmentService {

	@Autowired
	private EnrollmentRepository enrollmentRepository;

	public List<Enrollment> findByStudentId(Long studentId) {
		return enrollmentRepository.findByStudentId(studentId);
	}

	public List<Enrollment> findByCourseId(Long courseId) {
		return enrollmentRepository.findByCourseId(courseId);
	}

	public Enrollment addCartByCourseAndStudent(Long courseId, Long studentId) {
		Enrollment cart = new Enrollment();
		cart.setCourseId(courseId);
		cart.setStudentId(studentId);
		return enrollmentRepository.save(cart);
	}

	public Enrollment findByCourseIdAndStudentId(Long courseId, Long studentId) {
		return enrollmentRepository.findByCourseIdAndStudentId(courseId, studentId);
	}

	@Transactional
	public void deleteEnrollmentByCourseIdAndStudentId(Long courseId, Long studentId) {
		enrollmentRepository.deleteByCourseIdAndStudentId(courseId, studentId);
	}

}