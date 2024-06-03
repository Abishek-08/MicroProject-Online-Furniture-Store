package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.modal.Shipping;
import com.store.service.ShippingService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/shipping")
public class ShippingController {

	@Autowired
	ShippingService shippingService;

	@PostMapping("/addAddress")
	public ResponseEntity<String> doInsertAddress(@RequestBody Shipping shipping) {
		try {
			shippingService.insertShipping(shipping);
			return ResponseEntity.ok("Insertion success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Insertion failure");
		}
	}

	@GetMapping("/getAllAddressById/{id}")
	public List<Shipping> doFindAll(@PathVariable("id") int id) {
		return shippingService.findAllShipById(id);
	}

	@DeleteMapping("/deleteAllAddress/{id}")
	public ResponseEntity<String> doDeleteAddress(@PathVariable("id")int id) {
		try {
			shippingService.deleteShipping(id);
			return ResponseEntity.ok("success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("failure");
		}
	}

}
