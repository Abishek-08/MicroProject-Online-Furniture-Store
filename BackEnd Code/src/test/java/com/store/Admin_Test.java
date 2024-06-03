package com.store;

import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.store.modal.Admin;
import com.store.service.AdminService;

@SpringBootTest
public class Admin_Test {

	@Autowired
	AdminService adminService;

	@Test
	void test_findByUserNameAdmin() {
		Admin admin = adminService.findByUserName("Abi$12");
		assertNotNull(admin);

	}
	
	@Test
	void test_ValidateAdminLogin() {
		boolean result = adminService.validateAdminLogIn("Abi$12", "Abi@1234");
		assertEquals(true, result);
	}
	
	@Test
	void test_ValidateAdminLoginError() {
		boolean result = adminService.validateAdminLogIn("Abi$18", "Abi@1234");
		assertEquals(false, result);
	}
	
	@Test
	void test_ValidateAdminUserName() {
		boolean result = adminService.validateAdminUserName("Abi$120801");
		assertEquals(false, false);
	}

}
