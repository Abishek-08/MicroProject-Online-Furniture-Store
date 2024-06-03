package com.store.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.store.modal.Customer;
import com.store.service.CustomerService;

import jakarta.ws.rs.core.HttpHeaders;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/customer")
public class CustomerController {

	@Autowired
	CustomerService service;

	@PostMapping(path = "/registerCustomer", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> doRegister(@RequestParam("cusName") String cusName,
			@RequestParam("cusAge") String cusAge, @RequestParam("cusGender") String cusGender,
			@RequestParam("cusMobile") String cusMobile, @RequestParam("cusLocation") String cusLocation,
			@RequestParam("cusEmail") String cusEmail, @RequestParam("cusPassword") String cusPassword,
			@RequestParam("file") MultipartFile file) throws IOException {

		System.out.println(cusPassword);

		BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
		String cryptPWD = crypt.encode(cusPassword);

		Customer customer = new Customer();
		customer.setCusName(cusName);
		customer.setCusAge(cusAge);
		customer.setCusGender(cusGender);
		customer.setCusLocation(cusLocation);
		customer.setCusMobile(cusMobile);
		customer.setCusEmail(cusEmail);
		customer.setCusPassword(cryptPWD);
		customer.setImageName(file.getOriginalFilename());
		customer.setImageType(file.getContentType());
		customer.setImage(Base64.getEncoder().encode(file.getBytes()));

		Customer check = service.findCustomerByEmail(cusEmail);
		if (check == null) {
			service.registerCustomer(customer);
			return ResponseEntity.ok("Registration successfull");

		} else {
			return ResponseEntity.badRequest().body("Already Registered customer");
		}

	}

	@GetMapping("/findCustomerImageEmail/{email}")
	public ResponseEntity<ByteArrayResource> doFindByEmail(@PathVariable("email") String email) {
		try {
			Customer customer = service.findCustomerByEmail(email);
			byte[] image = Base64.getDecoder().decode(customer.getImage());
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(customer.getImageType()))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\"" + customer.getImageName() + "\"")
					.body(new ByteArrayResource(image));
		} catch (Exception e) {
			return null;
		}

	}

	@GetMapping("/findCustomerEmail/{email}")
	public Customer doFindCustomer(@PathVariable("email") String email) {
		return service.findCustomerByEmail(email);
	}

	@PostMapping("/validateCustomerLogin")
	public ResponseEntity<String> doValidation(@RequestBody Customer customer) {
		System.out.println(service.validateCustomerLogin(customer.getCusEmail(), customer.getCusPassword()));
		if (service.validateCustomerLogin(customer.getCusEmail(), customer.getCusPassword())) {
			return ResponseEntity.ok("Login Success");
		} else {
			return ResponseEntity.badRequest().body("Invalid User");
		}
	}

	@GetMapping("/getAllCustomer")
	public List<Customer> doGetAllCustomer() {
		return service.findAllCustomer();
	}

	@DeleteMapping("/deleteCustomer/{id}")
	public ResponseEntity<String> doDelete(@PathVariable("id") int id) {
		try {
			service.deleteCustomerById(id);
			return ResponseEntity.ok("deletion success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("deletion failure");
		}
	}
	
	@PutMapping(path = "/updateCustomer", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> doUpdate(@RequestParam("cusId")int cusId, @RequestParam("cusName") String cusName,
			@RequestParam("cusAge") String cusAge, @RequestParam("cusGender") String cusGender,
			@RequestParam("cusMobile") String cusMobile, @RequestParam("cusLocation") String cusLocation,
			@RequestParam("cusEmail") String cusEmail,
			@RequestParam("file") MultipartFile file) throws IOException {


		try {
		Customer customer1 = service.findCustomerByEmail(cusEmail);
		String originalPwd =  customer1.getCusPassword();

		Customer customer = new Customer();
		customer.setCusId(cusId);
		customer.setCusName(cusName);
		customer.setCusAge(cusAge);
		customer.setCusGender(cusGender);
		customer.setCusLocation(cusLocation);
		customer.setCusMobile(cusMobile);
		customer.setCusEmail(cusEmail);
		customer.setCusPassword(originalPwd);
		customer.setImageName(file.getOriginalFilename());
		customer.setImageType(file.getContentType());
		customer.setImage(Base64.getEncoder().encode(file.getBytes()));
		
		service.updateCustomerById(customer);
		return ResponseEntity.ok("updation success");
		}catch (Exception e) {
		  return ResponseEntity.badRequest().body("upation failure");
		}
		
		

		
	}

	

}
