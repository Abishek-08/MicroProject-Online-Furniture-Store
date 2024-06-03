package com.store.dao;

import java.util.List;

import com.store.modal.Customer;

public interface CustomerDao {
	
	public void registerCustomer(Customer csutomer);
	public List<Customer> findAllCustomer();
	public Customer findByCustomerEmail(String email);
	public Customer validateCustomerLogin(String email,String password);
	public void deleteCustomerById(int cusId);
	public void updateCustomerById(Customer customer);
	public Customer findCustomerByCusId(int cusId);

	

}
