package com.store.dao;

import java.util.List;

import com.store.modal.Shipping;

public interface ShippingDao {
	
	public List<Shipping> findAllShipping(int id);
	public void insertShipping(Shipping shipping);
	public void deleteShipping(int id);

}
