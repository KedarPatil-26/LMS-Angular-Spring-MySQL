package com.Eduline.LMS.cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@CrossOrigin
	@GetMapping("/getbystudentid/{studentId}")
	public ResponseEntity<List<Cart>> getCartsByStudentId(@PathVariable Long studentId) {
		List<Cart> carts = cartService.findByStudentId(studentId);
		return new ResponseEntity<>(carts, HttpStatus.OK);
	}

	@CrossOrigin
	@PostMapping("/add")
	public ResponseEntity<Cart> addCart(@RequestBody Cart cart) {
		Cart newCart = cartService.addCartByCourseAndStudent(cart.getCourseId(), cart.getStudentId());
		return new ResponseEntity<>(newCart, HttpStatus.CREATED);
	}

	@CrossOrigin
	@GetMapping("/getbycourseid/{courseId}")
	public ResponseEntity<List<Cart>> getCartByCourseId(@PathVariable Long courseId) {
		List<Cart> carts = cartService.findByCourseId(courseId);
		return new ResponseEntity<>(carts, HttpStatus.OK);
	}

	@CrossOrigin
	@GetMapping("/getbycourseandstudent/{courseId}/{studentId}")
	public ResponseEntity<Cart> getCartByCourseAndStudentId(@PathVariable Long courseId, @PathVariable Long studentId) {
		Cart cart = cartService.findByCourseIdAndStudentId(courseId, studentId);
		return new ResponseEntity<>(cart, HttpStatus.OK);
	}

	@CrossOrigin
	@DeleteMapping("/delete/{courseId}/{studentId}")
	public ResponseEntity<Void> deleteCategory(@PathVariable Long courseId, @PathVariable Long studentId) {
		cartService.deleteCartByCourseIdAndStudentId(courseId, studentId);
		return ResponseEntity.noContent().build();
	}

}