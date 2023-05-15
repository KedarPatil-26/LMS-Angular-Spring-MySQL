package com.Eduline.LMS.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;

	public List<Cart> findByStudentId(Long studentId) {
		return cartRepository.findByStudentId(studentId);
	}

	public List<Cart> findByCourseId(Long courseId) {
		return cartRepository.findByCourseId(courseId);
	}

	public Cart addCartByCourseAndStudent(Long courseId, Long studentId) {
		Cart cart = new Cart();
		cart.setCourseId(courseId);
		cart.setStudentId(studentId);
		return cartRepository.save(cart);
	}

	public Cart findByCourseIdAndStudentId(Long courseId, Long studentId) {
		return cartRepository.findByCourseIdAndStudentId(courseId, studentId);
	}

	@Transactional
	public void deleteCartByCourseIdAndStudentId(Long courseId, Long studentId) {
		cartRepository.deleteByCourseIdAndStudentId(courseId, studentId);
	}

}