package com.store.dao;

import java.util.List;

import com.store.modal.CartItems;

public interface CartDao {
	
	public void saveCart(CartItems cartitmes);
	public boolean validateCartById(int itemId,int cusId);
	public List<CartItems> findAllCartById(int id);
	public int cartTotalPriceById(int id);
	public boolean updateCart(CartItems cartitems);
	public void deleteCart(int id);
	public List<Integer> findItemIdList(int id);
	public CartItems findCartItemByCusIdItemId(int itemId,int cusId);
}
