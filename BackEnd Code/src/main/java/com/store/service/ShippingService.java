package com.store.service;

import java.util.List;

import com.store.modal.Shipping;

public interface ShippingService {
	
	public List<Shipping> findAllShipById(int id);
	public void insertShipping(Shipping shipping);
	public void deleteShipping(int cusId);

}
