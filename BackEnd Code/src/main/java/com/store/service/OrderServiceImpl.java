package com.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dao.OrderDao;
import com.store.modal.OrderItems;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderDao orderDao;

	@Override
	public void insertOrder(OrderItems orderItems) {
		orderDao.insertOrder(orderItems);

	}

	@Override
	public List<OrderItems> findAllOrders() {
		return orderDao.findAllOrder();
	}

	@Override
	public List<OrderItems> findAllOrdersByCusId(int id) {
		return orderDao.findOrderById(id);
	}

	@Override
	public boolean validateOrderByCusIdItemId(int cusId, int furId) {
		return orderDao.validateOrderByCusId(cusId, furId);
	}

	@Override
	public OrderItems findByOrderId(int orderId) {
		return orderDao.findOrderByOrderId(orderId);
	}

	@Override
	public void updateOrder(OrderItems orderItems) {
		orderDao.updateOrder(orderItems);

	}

	@Override
	public void deleteOrderById(int orderId) {
		orderDao.deleteOrderById(orderId);

	}
	
	@Override
	public List<OrderItems> findAllOrderByCustomerId(int cusId) {
		return orderDao.findAllOrder();
	}
	
	@Override
	public void cancelOrderByCustomer(int cusId, int orderId) {
		orderDao.deleteOrderByCusId(cusId, orderId);
		
	}

}
