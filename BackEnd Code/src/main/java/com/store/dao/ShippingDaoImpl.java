package com.store.dao;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.store.modal.Shipping;

import jakarta.persistence.EntityManager;

@Repository
public class ShippingDaoImpl implements ShippingDao {

	@Autowired
	EntityManager entityManager;

	@Override
	public List<Shipping> findAllShipping(int id) {
		try {
			Query<Shipping> query = (Query<Shipping>) entityManager
					.createQuery("from Shipping as ship where ship.customer.cusId=:id");
			query.setParameter("id", id);
			return query.getResultList();
		} catch (Exception e) {
			return null;
		}

	}

	@Override
	public void insertShipping(Shipping shipping) {
		try {
			entityManager.persist(shipping);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public void deleteShipping(int id) {
		try {
			Query<Shipping> query = (Query<Shipping>) entityManager
					.createQuery("FROM Shipping as ship where ship.customer.cusId=:id");
			query.setParameter("id", id);
			List<Shipping> ship = query.getResultList();
			for (Shipping add : ship) {
				entityManager.remove(add);
			}

		} catch (Exception e) {
			System.out.println(e);
		}

	}

}
