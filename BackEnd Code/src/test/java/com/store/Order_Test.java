package com.store;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.store.modal.OrderItems;
import com.store.service.OrderService;

@SpringBootTest
public class Order_Test {
	
	@Autowired
	OrderService orderService; 
	
	
	@Test
	void test_findAllOrder() {
		List<OrderItems> orderItems = orderService.findAllOrders();
		assertNotNull(orderItems);
	}
	
	@Test
	void test_findOrderByCusId() {
		List<OrderItems> orderItems = orderService.findAllOrderByCustomerId(5);
		assertNotNull(orderItems);
	}
	
	
	@Test
	void test_findByOrderId() {
		OrderItems orderItems = orderService.findByOrderId(28);
		assertNotNull(orderItems);
	}
	
	@Test
	void test_findAllByCusId() {
		List<OrderItems> orderItems = orderService.findAllOrdersByCusId(2);
		assertNotNull(orderItems);
	}

}
