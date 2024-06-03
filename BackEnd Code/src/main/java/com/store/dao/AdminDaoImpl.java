package com.store.dao;

import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.store.modal.Admin;

import jakarta.persistence.EntityManager;

@Repository
public class AdminDaoImpl implements AdminDao {

	@Autowired
	EntityManager entity;

	@Override
	public void insertAdmin(Admin admin) {
		try {
			entity.persist(admin);
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public boolean validateAdminUserName(String usName) {

		try {
			Query<Admin> qr = (Query<Admin>) entity.createQuery("from Admin where adUserName=:name");
			qr.setParameter("name", usName);
			Admin admin = qr.getSingleResult();

			return true;
		} catch (Exception e) {
			return false;
		}

	}

	@Override
	public Admin validateAdminLogIn(String usrName, String password) {
		try {
			Query<Admin> qr = (Query<Admin>) entity.createQuery("from Admin where adUserName=:name");
			qr.setParameter("name", usrName);
			// qr.setParameter("password", password);
			Admin admin = qr.getSingleResult();

			return admin;

		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public Admin findByUserName(String usName) {
		Query<Admin> qr = (Query<Admin>) entity.createQuery("from Admin where adUserName=:usName");
		qr.setParameter("usName", usName);
		return qr.getSingleResult();
	}

}
