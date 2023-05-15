package com.Eduline.LMS.wishlist;

import com.Eduline.LMS.cart.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
	List<Wishlist> findByStudentId(Long studentId);

	List<Wishlist> findByCourseId(Long courseId);

	Wishlist findByCourseIdAndStudentId(Long courseId, Long studentID);

	void deleteByCourseIdAndStudentId(Long courseId, Long studentId);

}