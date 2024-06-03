package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.modal.CartItems;
import com.store.modal.Customer;
import com.store.service.CartService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/cart")
public class CartController {

	@Autowired
	CartService cartservice;

	@PostMapping("/insertCart")
	public ResponseEntity<String> insertCart(@RequestBody CartItems cartitems) {

		Customer customer = cartitems.getCustomer();
		int cusId = customer.getCusId();

		if (cartservice.validateCartById(cartitems.getItemId(), cusId)) {
			return ResponseEntity.badRequest().body("item already present");
		} else {
			cartservice.insertCart(cartitems);
			return ResponseEntity.ok("item insert success");
		}

	}

	@GetMapping("/getAllItems/{id}")
	public List<CartItems> doFindAll(@PathVariable("id") int id) {
		return cartservice.findAllCartItemsById(id);
	}

	@GetMapping("/cartTotalPrice/{id}")
	public int doTotalPrice(@PathVariable("id") int id) {
		return cartservice.cartTotalCountById(id);
	}

	@PutMapping("/updateCart")
	public ResponseEntity<String> doUpdate(@RequestBody CartItems cartItems) {

		if (cartservice.updateCart(cartItems)) {

			return ResponseEntity.ok("updation success");
		} else {

			return ResponseEntity.badRequest().body("updation failure");
		}

	}

	@DeleteMapping("/deleteCart/{id}")
	public ResponseEntity<String> doDelete(@PathVariable("id") int id) {
		try {
			cartservice.deleteCart(id);
			return ResponseEntity.ok("delete success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("delete failure");
		}
	}

	@GetMapping("/getItemListById/{id}")
	public List<Integer> doFindItemId(@PathVariable("id") int id) {

		return cartservice.getItemIdList(id);

	}

}
