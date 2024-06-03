package com.store.modal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Shipping")
public class Shipping {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int shipId;
	private String shipAddress;
	
	@ManyToOne(targetEntity = Customer.class,cascade = CascadeType.DETACH)
	@JoinColumn(name="cusId")
	private Customer customer;

	public Shipping() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Shipping(int shipId, String shipAddress, Customer customer) {
		super();
		this.shipId = shipId;
		this.shipAddress = shipAddress;
		this.customer = customer;
	}

	public int getShipId() {
		return shipId;
	}

	public void setShipId(int shipId) {
		this.shipId = shipId;
	}

	public String getShipAddress() {
		return shipAddress;
	}

	public void setShipAddress(String shipAddress) {
		this.shipAddress = shipAddress;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	
	
	
	
	

}
