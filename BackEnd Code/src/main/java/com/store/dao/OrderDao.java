package com.store.dao;

import java.util.List;

import com.store.modal.OrderItems;

public interface OrderDao {
	
	public void insertOrder(OrderItems orderItems);
	public List<OrderItems> findAllOrder();
	public List<OrderItems> findOrderById(int id);
	public boolean validateOrderByCusId(int cusId,int furId);
	public OrderItems findOrderByOrderId(int orderId);
	public void updateOrder(OrderItems orderItems);
	public void deleteOrderById(int orderId);
	public List<OrderItems> findOrderByCusId(int cusId);
	public void deleteOrderByCusId(int cusId,int orderId);

}
