package com.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dao.CartDao;
import com.store.modal.CartItems;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class CartServiceImpl implements CartService{
	
	@Autowired
	CartDao cartdao;
	
	@Override
	public void insertCart(CartItems cartitems) {
		cartdao.saveCart(cartitems);
		
	}
	
	@Override
	public boolean validateCartById(int itemId,int cusId) {
		return cartdao.validateCartById(itemId,cusId);
	}
	
	@Override
	public List<CartItems> findAllCartItemsById(int id) {
		return cartdao.findAllCartById(id);
	}
	
	@Override
	public boolean updateCart(CartItems cartItems) {
		return cartdao.updateCart(cartItems);
		
	}
	
	@Override
	public int cartTotalCountById(int id) {
	   return cartdao.cartTotalPriceById(id);
	}
	
	@Override
	public void deleteCart(int id) {
		cartdao.deleteCart(id);
		
	}
	
	@Override
	public List<Integer> getItemIdList(int id) {
		return cartdao.findItemIdList(id);
	}
	
	@Override
	public CartItems findCartItemsByCusIdByItemId(int itemId, int cusId) {
		return cartdao.findCartItemByCusIdItemId(itemId, cusId);
	}
	
	
}
