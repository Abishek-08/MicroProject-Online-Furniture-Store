package com.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.modal.Admin;
import com.store.service.AdminService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	AdminService service;

	@PostMapping("/registerAdmin")
	public ResponseEntity<String> doRegisterAdmin(@RequestBody Admin admin) {
		String adUserName = admin.getAdUserName();

		BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();
		String encryppwd = bCrypt.encode(admin.getAdPassword());
		admin.setAdPassword(encryppwd);

		if (service.validateAdminUserName(adUserName)) {
			return ResponseEntity.badRequest().body("Already Registered Admin");

		} else {
			service.registerAdmin(admin);
			return ResponseEntity.ok("Registration Success");
		}

	}

	@PostMapping("/validateAdminUserName")
	public ResponseEntity<String> doValidateUserName(@RequestBody Admin admin) {
		String userName = admin.getAdUserName();

		if (service.validateAdminUserName(userName)) {
			return ResponseEntity.badRequest().body("UserName is already present");
		} else {
			return ResponseEntity.ok("New UserName");
		}
	}

	@PostMapping("/validateAdminLogin")
	public ResponseEntity<String> doValidateAdminLogin(@RequestBody Admin admin) {
		
		System.out.println(service.validateAdminLogIn(admin.getAdUserName(), admin.getAdPassword()));
		if (service.validateAdminLogIn(admin.getAdUserName(), admin.getAdPassword())) {
			
			return ResponseEntity.ok("Login Success");
		} else {
			return ResponseEntity.badRequest().body("Login Failure");
		}
	}
	
	@GetMapping("/findAdminByUsrName/{userName}")
	public Admin doFindByEmail(@PathVariable("userName")String userName){
		return service.findByUserName(userName);
	}
	

}
