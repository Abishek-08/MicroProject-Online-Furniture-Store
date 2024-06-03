package com.store;

import static org.junit.Assert.assertNotNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.store.modal.Shipping;
import com.store.service.ShippingService;

@SpringBootTest
public class Shipping_Test {

	@Autowired
	ShippingService shippingService;
	
	@Test
	void test_findAllShipping() {
		List<Shipping> shipList = shippingService.findAllShipById(4);
		assertNotNull(shipList);
	}

}
