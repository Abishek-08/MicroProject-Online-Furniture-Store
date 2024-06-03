package com.store.service;

import java.util.List;

import com.store.modal.OrderItems;

public interface OrderService {
	
	public void insertOrder(OrderItems orderItems);
	public List<OrderItems> findAllOrders();
	public List<OrderItems> findAllOrdersByCusId(int id);
	public boolean validateOrderByCusIdItemId(int cusId,int furId);
	public OrderItems findByOrderId(int orderId);
	public void updateOrder(OrderItems orderItems);
	public void deleteOrderById(int orderId);
	public List<OrderItems> findAllOrderByCustomerId(int cusId);
	public void cancelOrderByCustomer(int cusId,int orderId);

}
