package com.store.dao;

import java.util.List;

import com.store.modal.Furniture;

public interface FurnitureDao {
	
	public void addFurniture(Furniture furniture);
	public Furniture findFurImageById(int id);
	public List<Furniture> findAllFurniture();
	public void updateFurniture(Furniture furniture);
	public void deleteFurnitureId(int id);
	public void updateFurnitureQuantity(int furId,int quantity);
	public void updateFurnitureQuanityCancel(int furId,int quantity);
	
	

}
