package com.store;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.store.modal.Furniture;
import com.store.service.FurnitureService;

@SpringBootTest
public class Furniture_Test {
	
	@Autowired
	FurnitureService furnitureService;
	
	@Test
	void test_findByFurnitureId() {
		Furniture furniture = furnitureService.findFurById(1);
		assertNotNull(furniture);
	}
	
	
	@Test
	void test_findAllFuniture() {
		List<Furniture> funitureList = furnitureService.getFurnitureList();
		assertNotNull(funitureList);
	}
	
	

}
