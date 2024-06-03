package com.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dao.ShippingDao;
import com.store.modal.Shipping;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ShippingServiceImpl implements ShippingService {
	
	@Autowired
	ShippingDao shippingDao;
	
	@Override
	public List<Shipping> findAllShipById(int id) {
		return shippingDao.findAllShipping(id);
	}
	
	@Override
	public void insertShipping(Shipping shipping) {
		shippingDao.insertShipping(shipping);
		
	}
	
	@Override
	public void deleteShipping(int cusId) {
		shippingDao.deleteShipping(cusId);
		
	}

}
