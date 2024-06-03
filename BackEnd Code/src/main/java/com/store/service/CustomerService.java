package com.store.service;

import java.util.List;

import com.store.modal.Customer;

public interface CustomerService {
	
	public void registerCustomer(Customer customer);
	public List<Customer> findAllCustomer();
	public Customer findCustomerByEmail(String email);
	public boolean validateCustomerLogin(String email,String password);
	public void deleteCustomerById(int cusId);
	public void updateCustomerById(Customer customer);
	public Customer findCustomerByCusId(int cusId);

}
