package com.Eduline.LMS.wishlist;

import com.Eduline.LMS.cart.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class WishlistService {

	@Autowired
	private WishlistRepository wishlistRepository;

	public List<Wishlist> findByStudentId(Long studentId) {
		return wishlistRepository.findByStudentId(studentId);
	}

	public List<Wishlist> findByCourseId(Long courseId) {
		return wishlistRepository.findByCourseId(courseId);
	}

	public Wishlist addWishlistByCourseAndStudent(Long courseId, Long studentId) {
		Wishlist wishlist = new Wishlist();
		wishlist.setCourseId(courseId);
		wishlist.setStudentId(studentId);
		return wishlistRepository.save(wishlist);
	}

	public Wishlist findByCourseIdAndStudentId(Long courseId, Long studentId) {
		return wishlistRepository.findByCourseIdAndStudentId(courseId, studentId);
	}

	@Transactional
	public void deleteWishlistByCourseIdAndStudentId(Long courseId, Long studentId) {
		wishlistRepository.deleteByCourseIdAndStudentId(courseId, studentId);
	}

}