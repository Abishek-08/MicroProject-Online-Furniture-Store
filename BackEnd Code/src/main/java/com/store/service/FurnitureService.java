package com.store.service;

import java.util.List;

import com.store.modal.Furniture;

public interface FurnitureService {
	
	public void addFurniture(Furniture fur);
	public Furniture findFurById(int id);
	public List<Furniture> getFurnitureList();
	public void updateFurniture(Furniture furniture);
	public void deleteFurnitureId(int id);
	public void updateFurnitureQuantity(int furId,int quantity);
	public void updateFurnitureQuantityCancel(int furId,int quantity);

}
