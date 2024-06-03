package com.store.dao;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.store.modal.Customer;

import jakarta.persistence.EntityManager;

@Repository
public class CustomerDaoImpl implements CustomerDao {

	@Autowired
	EntityManager entity;

	@Override
	public void registerCustomer(Customer customer) {
		try {
			entity.persist(customer);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public List<Customer> findAllCustomer() {
	   Query<Customer> query =  (Query<Customer>) entity.createQuery("from Customer");
	   return query.getResultList();
	}

	@Override
	public Customer findByCustomerEmail(String email) {
		try {
			Query<Customer> qr = (Query<Customer>) entity.createQuery("from Customer where cusEmail=:mail");
			qr.setParameter("mail", email);
			return qr.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public Customer validateCustomerLogin(String email, String password) {
		try {
			Query<Customer> qr = (Query<Customer>) entity.createQuery("from Customer where cusEmail=:mail");
			qr.setParameter("mail", email);
			Customer cust = qr.getSingleResult();
			return cust;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public void deleteCustomerById(int cusId) {
		try {
			Query<Customer> query = (Query<Customer>) entity.createQuery("from Customer where cusId=:id");
			query.setParameter("id", cusId);
			Customer customer = query.getSingleResult();
			entity.remove(customer);

		} catch (Exception e) {
			System.out.println(e);
		}

	}
	
	@Override
	public void updateCustomerById(Customer customer) {
		try {
			
			entity.merge(customer);

		} catch (Exception e) {
			System.out.println(e);
		}
		
	}
	
	@Override
	public Customer findCustomerByCusId(int cusId) {
		try {
			Query<Customer> query = (Query<Customer>) entity.createQuery("from Customer where cusId=:id");
			query.setParameter("id", cusId);
			return  query.getSingleResult();
			

		} catch (Exception e) {
			return null;
		}

	}

}
