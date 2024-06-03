package com.store.dao;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.store.modal.CartItems;
import com.store.modal.Furniture;

import jakarta.persistence.EntityManager;

@Repository
public class CartDaoImpl implements CartDao {

	@Autowired
	EntityManager entityManager;

	@Override
	public void saveCart(CartItems cartitmes) {
		try {
			entityManager.persist(cartitmes);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public boolean validateCartById(int itemId, int cusId) {
		try {
			Query<CartItems> qr = (Query<CartItems>) entityManager
					.createQuery("from CartItems as cart  where itemId=:itemId AND cart.customer.cusId=:cusId");
			qr.setParameter("cusId", cusId);
			qr.setParameter("itemId", itemId);
			qr.getSingleResult();
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public List<CartItems> findAllCartById(int id) {
		Query<CartItems> qr = (Query<CartItems>) entityManager
				.createQuery("from CartItems as cart where cart.customer.cusId=:id");
		qr.setParameter("id", id);
		return qr.getResultList();

	}

	@Override
	public int cartTotalPriceById(int id) {

		Query<BigDecimal> qr = (Query<BigDecimal>) entityManager
				.createQuery("select sum(itemTotalPrice) from CartItems as cart where cart.customer.cusId=:id");
		qr.setParameter("id", id);
		int totalPrice = qr.getSingleResult().intValue();
		return totalPrice;

	}

	@Override
	public boolean updateCart(CartItems cartitems) {
		int itemId = cartitems.getItemId();
		Query<Furniture> query = (Query<Furniture>) entityManager.createQuery("from Furniture where furId=:id");
		query.setParameter("id", itemId);
		Furniture furniture = query.getSingleResult();
		int initialCartQuantity = furniture.getFurQuantity();
		int changeCartQuantity = cartitems.getItemQuantity();

		if (changeCartQuantity < initialCartQuantity) {

			entityManager.merge(cartitems);
			return true;

		} else {
			return false;
		}

	}

	@Override
	public void deleteCart(int id) {
		try {
			Query<CartItems> qr = (Query<CartItems>) entityManager.createQuery("from CartItems where cartId=:id");
			qr.setParameter("id", id);
			CartItems cartItems = qr.getSingleResult();
			entityManager.remove(cartItems);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public List<Integer> findItemIdList(int id) {
		try {
			Query<Integer> qr = (Query<Integer>) entityManager
					.createQuery("select itemId from CartItems as cart where cart.customer.cusId=:id");
			qr.setParameter("id", id);
			return qr.getResultList();
		} catch (Exception e) {
			return null;
		}

	}

	@Override
	public CartItems findCartItemByCusIdItemId(int itemId, int cusId) {
		try {
			Query<CartItems> qr = (Query<CartItems>) entityManager
					.createQuery("from CartItems as cart  where itemId=:itemId AND cart.customer.cusId=:cusId");
			qr.setParameter("cusId", cusId);
			qr.setParameter("itemId", itemId);
			return qr.getSingleResult();

		} catch (Exception e) {
			return null;
		}
	}

}
