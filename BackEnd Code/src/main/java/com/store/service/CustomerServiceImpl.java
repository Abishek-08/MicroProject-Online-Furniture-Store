package com.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.store.dao.CustomerDao;
import com.store.modal.Customer;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	CustomerDao dao;

	@Override
	public void registerCustomer(Customer customer) {
		dao.registerCustomer(customer);

	}

	@Override
	public List<Customer> findAllCustomer() {

		return dao.findAllCustomer();
	}

	@Override
	public Customer findCustomerByEmail(String email) {

		return dao.findByCustomerEmail(email);
	}

	@Override
	public boolean validateCustomerLogin(String email, String password) {

		System.out.println(password);
		Customer cust = dao.validateCustomerLogin(email, password);
		BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
		System.out.println(crypt.matches(password, cust.getCusPassword()));
		return crypt.matches(password, cust.getCusPassword());

	}
	
	@Override
	public void deleteCustomerById(int cusId) {
		dao.deleteCustomerById(cusId);
		
	}
	
	@Override
	public void updateCustomerById(Customer customer) {
		dao.updateCustomerById(customer);
		
	}
	
	@Override
	public Customer findCustomerByCusId(int cusId) {
		return dao.findCustomerByCusId(cusId);
	}

}
