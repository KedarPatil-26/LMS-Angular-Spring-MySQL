package com.Eduline.LMS.wishlist;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

	@Autowired
	private WishlistService wishlistService;

	@CrossOrigin
	@GetMapping("/getbystudentid/{studentId}")
	public ResponseEntity<List<Wishlist>> getWishlistsByStudentId(@PathVariable Long studentId) {
		List<Wishlist> wishlists = wishlistService.findByStudentId(studentId);
		return new ResponseEntity<>(wishlists, HttpStatus.OK);
	}

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Wishlist> addWishlist(@RequestBody Wishlist wishlist) {
		Wishlist newWishlist = wishlistService.addWishlistByCourseAndStudent(wishlist.getCourseId(), wishlist.getStudentId());
		return new ResponseEntity<>(newWishlist, HttpStatus.CREATED);
	}

	@CrossOrigin
	@GetMapping("/getbycourseid/{courseId}")
	public ResponseEntity<List<Wishlist>> getWishlistByCourseId(@PathVariable Long courseId) {
		List<Wishlist> wishlist = wishlistService.findByCourseId(courseId);
		return new ResponseEntity<>(wishlist, HttpStatus.OK);
	}

	@CrossOrigin
	@GetMapping("/getbycourseandstudent/{courseId}/{studentId}")
	public ResponseEntity<Wishlist> getWishlistByCourseAndStudentId(@PathVariable Long courseId, @PathVariable Long studentId) {
		Wishlist wishlist = wishlistService.findByCourseIdAndStudentId(courseId, studentId);
		return new ResponseEntity<>(wishlist, HttpStatus.OK);
	}

	@CrossOrigin
	@DeleteMapping("/delete/{courseId}/{studentId}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long courseId,@PathVariable Long studentId) {
		wishlistService.deleteWishlistByCourseIdAndStudentId(courseId, studentId);
		return ResponseEntity.noContent().build();
	}


}