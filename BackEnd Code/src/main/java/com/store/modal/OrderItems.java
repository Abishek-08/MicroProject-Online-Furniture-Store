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
@Table(name="OrderItem")
public class OrderItems {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderId;
	private String orderDateOfOrder;
	private String orderDateOfDelivery;
	private String orderStatus;
	private String orderAmount;
	private int orderQuantity;
	
	
	@ManyToOne(targetEntity = Customer.class,cascade = CascadeType.DETACH)
	@JoinColumn
	private Customer customer;
	
	@ManyToOne(targetEntity = Furniture.class,cascade = CascadeType.DETACH)
	@JoinColumn
	private Furniture furniture;

	@ManyToOne(targetEntity = Shipping.class,cascade =  CascadeType.DETACH)
	@JoinColumn
	private Shipping shipping;

	public OrderItems() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrderItems(int orderId, String orderDateOfOrder, String orderDateOfDelivery, String orderStatus,
			String orderAmount, int orderQuantity, Customer customer, Furniture furniture, Shipping shipping) {
		super();
		this.orderId = orderId;
		this.orderDateOfOrder = orderDateOfOrder;
		this.orderDateOfDelivery = orderDateOfDelivery;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		this.orderQuantity = orderQuantity;
		this.customer = customer;
		this.furniture = furniture;
		this.shipping = shipping;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public String getOrderDateOfOrder() {
		return orderDateOfOrder;
	}

	public void setOrderDateOfOrder(String orderDateOfOrder) {
		this.orderDateOfOrder = orderDateOfOrder;
	}

	public String getOrderDateOfDelivery() {
		return orderDateOfDelivery;
	}

	public void setOrderDateOfDelivery(String orderDateOfDelivery) {
		this.orderDateOfDelivery = orderDateOfDelivery;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(String orderAmount) {
		this.orderAmount = orderAmount;
	}

	public int getOrderQuantity() {
		return orderQuantity;
	}

	public void setOrderQuantity(int orderQuantity) {
		this.orderQuantity = orderQuantity;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Furniture getFurniture() {
		return furniture;
	}

	public void setFurniture(Furniture furniture) {
		this.furniture = furniture;
	}

	public Shipping getShipping() {
		return shipping;
	}

	public void setShipping(Shipping shipping) {
		this.shipping = shipping;
	}

	
	
}
