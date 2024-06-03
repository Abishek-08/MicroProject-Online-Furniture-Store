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
@Table(name="Cart")
public class CartItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cartId;
	private int itemId;
	private String itemName;
	private String itemPrice;
	private int itemQuantity;
	private String itemTotalPrice;
	
	@ManyToOne(targetEntity = Customer.class,cascade = CascadeType.DETACH)
	@JoinColumn(name="cusId")
	private Customer customer;
	
	
	

	public CartItems() {
		super();
		// TODO Auto-generated constructor stub
	}




	public CartItems(int cartId, int itemId, String itemName, String itemPrice, int itemQuantity, String itemTotalPrice,
			Customer customer) {
		super();
		this.cartId = cartId;
		this.itemId = itemId;
		this.itemName = itemName;
		this.itemPrice = itemPrice;
		this.itemQuantity = itemQuantity;
		this.itemTotalPrice = itemTotalPrice;
		this.customer = customer;
	}




	public int getCartId() {
		return cartId;
	}




	public void setCartId(int cartId) {
		this.cartId = cartId;
	}




	public int getItemId() {
		return itemId;
	}




	public void setItemId(int itemId) {
		this.itemId = itemId;
	}




	public String getItemName() {
		return itemName;
	}




	public void setItemName(String itemName) {
		this.itemName = itemName;
	}




	public String getItemPrice() {
		return itemPrice;
	}




	public void setItemPrice(String itemPrice) {
		this.itemPrice = itemPrice;
	}




	public int getItemQuantity() {
		return itemQuantity;
	}




	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}




	public String getItemTotalPrice() {
		return itemTotalPrice;
	}




	public void setItemTotalPrice(String itemTotalPrice) {
		this.itemTotalPrice = itemTotalPrice;
	}




	public Customer getCustomer() {
		return customer;
	}




	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	
	




	

	
}
