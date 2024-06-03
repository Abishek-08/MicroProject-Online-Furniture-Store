package com.store;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.store.modal.Customer;
import com.store.service.CustomerService;

@SpringBootTest
public class Customer_Test {
	
	@Autowired
	CustomerService customerService;
	
	@Test
	void test_findCustomerByEmail() {
		Customer customer = customerService.findCustomerByEmail("abishek@gmail.com");
		assertNotNull(customer);
		
	}
	
	@Test
	void test_validateCustomer() {
		boolean result = customerService.validateCustomerLogin("abishek@gmail.com", "Abi@1234");
		assertEquals(true, result);
	}
	
	@Test
	void test_validateCustomerWorst() {
		boolean result = customerService.validateCustomerLogin("abishek@gmail.com", "Abi@12345");
		assertEquals(false, result);
	}
	
	@Test
	void test_findCustomerById() {
		Customer customer = customerService.findCustomerByCusId(1);
		assertNotNull(customer);
	}
	
	
	

}
