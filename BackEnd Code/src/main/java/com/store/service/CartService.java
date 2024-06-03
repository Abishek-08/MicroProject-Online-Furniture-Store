package com.store.service;

import java.util.List;

import com.store.modal.CartItems;

public interface CartService {
	
	public void insertCart(CartItems cartitems);
	public boolean validateCartById(int itemId,int cusId);
	public List<CartItems> findAllCartItemsById(int id);
	public int cartTotalCountById(int id);
	public boolean updateCart(CartItems cartItems);
	public void deleteCart(int id);
	public List<Integer> getItemIdList(int id);
	public CartItems findCartItemsByCusIdByItemId(int itemId,int cusId);
	

}
