package com.store.dao;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.store.modal.Furniture;

import jakarta.persistence.EntityManager;

@Repository
public class FurnitureDaoImpl implements FurnitureDao {

	@Autowired
	EntityManager entityManager;

	@Override
	public void addFurniture(Furniture furniture) {
		try {
			entityManager.persist(furniture);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public Furniture findFurImageById(int id) {
		try {
			Query<Furniture> qr = (Query<Furniture>) entityManager.createQuery("from Furniture where furId=:id");
			qr.setParameter("id", id);
			return qr.getSingleResult();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public List<Furniture> findAllFurniture() {
		Query<Furniture> qr = (Query<Furniture>) entityManager.createQuery("from Furniture");
		return qr.getResultList();
	}

	@Override
	public void deleteFurnitureId(int id) {
		try {
			Query<Furniture> qr = (Query<Furniture>) entityManager.createQuery("from Furniture where furId=:id");
			qr.setParameter("id", id);
			Furniture fur = qr.getSingleResult();
			entityManager.remove(fur);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public void updateFurniture(Furniture furniture) {
		try {
			entityManager.merge(furniture);
		} catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public void updateFurnitureQuantity(int furId, int quantity) {
		Query<Furniture> query = (Query<Furniture>) entityManager.createQuery("from Furniture where furId=:id");
		query.setParameter("id", furId);
		Furniture furniture = query.getSingleResult();
		int previousQuantity = furniture.getFurQuantity();

		int finalQuantity = previousQuantity - quantity;

		Query<Furniture> query1 = (Query<Furniture>) entityManager
				.createQuery("update Furniture set furQuantity=:value where furId=:id");
		query1.setParameter("value", finalQuantity);
		query1.setParameter("id", furId);
		query1.executeUpdate();

	}

	@Override
	public void updateFurnitureQuanityCancel(int furId, int quantity) {
		Query<Furniture> query1 = (Query<Furniture>) entityManager
				.createQuery("update Furniture set furQuantity=:value where furId=:id");
		query1.setParameter("value", quantity);
		query1.setParameter("id", furId);
		query1.executeUpdate();

	}

}
