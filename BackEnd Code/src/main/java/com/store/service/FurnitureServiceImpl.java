package com.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dao.FurnitureDao;
import com.store.modal.Furniture;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FurnitureServiceImpl implements FurnitureService{
	
	@Autowired
	FurnitureDao furnitureDao;
	
	@Override
	public void addFurniture(Furniture furniture) {
		furnitureDao.addFurniture(furniture);
	}
		
	@Override
	public Furniture findFurById(int id) {
		return furnitureDao.findFurImageById(id);
	}
	
	@Override
	public List<Furniture> getFurnitureList() {
		return furnitureDao.findAllFurniture();
	}
	
	@Override
	public void updateFurniture(Furniture furniture) {
		furnitureDao.updateFurniture(furniture);
	}
	
	@Override
	public void deleteFurnitureId(int id) {
		furnitureDao.deleteFurnitureId(id);
	}
	
	@Override
	public void updateFurnitureQuantity(int furId, int quantity) {
	   furnitureDao.updateFurnitureQuantity(furId,quantity);
		
	}
	
	@Override
	public void updateFurnitureQuantityCancel(int furId, int quantity) {
		furnitureDao.updateFurnitureQuanityCancel(furId, quantity);
		
	}

}
