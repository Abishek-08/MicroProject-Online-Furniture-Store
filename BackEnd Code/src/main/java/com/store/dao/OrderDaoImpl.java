package com.store.dao;

import java.util.List;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.store.modal.Furniture;
import com.store.modal.OrderItems;
import com.store.service.FurnitureService;

import jakarta.persistence.EntityManager;

@Repository
public class OrderDaoImpl implements OrderDao {

	@Autowired
	EntityManager entityManager;

	@Autowired
	FurnitureService furnitureService;

	@Override
	public void insertOrder(OrderItems orderItems) {
		try {
			entityManager.persist(orderItems);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public List<OrderItems> findAllOrder() {
		try {
			Query<OrderItems> query = (Query<OrderItems>) entityManager.createQuery("from OrderItems");
			return query.getResultList();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public List<OrderItems> findOrderById(int id) {
		try {
			Query<OrderItems> query = (Query<OrderItems>) entityManager
					.createQuery("from OrderItems as order where order.customer.cusId=:id");
			query.setParameter("id", id);
			return query.getResultList();
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public boolean validateOrderByCusId(int cusId, int furId) {

		try {
			Query<OrderItems> query = (Query<OrderItems>) entityManager.createQuery(
					"from OrderItems as order where order.customer.cusId=:cusId AND order.furniture.furId=:furId");
			query.setParameter("cusId", cusId);
			query.setParameter("furId", furId);
			OrderItems orderItems = query.getSingleResult();
			return true;
		} catch (Exception e) {
			return false;
		}

	}

	@Override
	public OrderItems findOrderByOrderId(int orderId) {
		Query<OrderItems> query = (Query<OrderItems>) entityManager.createQuery("from OrderItems where orderId=:id");
		query.setParameter("id", orderId);
		return query.getSingleResult();
	}

	@Override
	public void updateOrder(OrderItems orderItems) {
		try {
			entityManager.merge(orderItems);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public void deleteOrderById(int orderId) {
		try {
			Query<OrderItems> query = (Query<OrderItems>) entityManager
					.createQuery("from OrderItems where orderId=:id");
			query.setParameter("id", orderId);
			OrderItems orderItems = query.getSingleResult();
			entityManager.remove(orderItems);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public List<OrderItems> findOrderByCusId(int cusId) {
		try {
			Query<OrderItems> query = (Query<OrderItems>) entityManager
					.createQuery("from OrderItems as order where order.customer.cusId=:id");
			query.setParameter("id", cusId);
			return query.getResultList();
		} catch (Exception e) {
			return null;
		}

	}

	@Override
	public void deleteOrderByCusId(int cusId, int orderId) {
		try {
			Query<OrderItems> query = (Query<OrderItems>) entityManager
					.createQuery("from OrderItems as order where order.customer.cusId=:cusId and orderId=:orderId");
			query.setParameter("cusId", cusId);
			query.setParameter("orderId", orderId);
			OrderItems orderItems = query.getSingleResult();

			Furniture furniture = orderItems.getFurniture();
			int furId = furniture.getFurId();
			int initialQuantity = furniture.getFurQuantity();
			int cancelQuantity = orderItems.getOrderQuantity();

			int addedQuantity = initialQuantity + cancelQuantity;
			System.out.println(addedQuantity);

			furnitureService.updateFurnitureQuantityCancel(furId, addedQuantity);

			entityManager.remove(orderItems);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

}
