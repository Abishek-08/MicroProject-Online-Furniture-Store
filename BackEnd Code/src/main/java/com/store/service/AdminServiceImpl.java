package com.store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.store.dao.AdminDao;
import com.store.modal.Admin;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	AdminDao dao;

	@Override
	public void registerAdmin(Admin admin) {
		dao.insertAdmin(admin);

	}

	@Override
	public boolean validateAdminUserName(String UsName) {

		return dao.validateAdminUserName(UsName);
	}

	@Override
	public boolean validateAdminLogIn(String usrName, String password) {
		try {

			Admin admin = dao.validateAdminLogIn(usrName, password);
			BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();

			return crypt.matches(password, admin.getAdPassword());
		} catch (Exception e) {
			return false;
		}

	}

	@Override
	public Admin findByUserName(String usrName) {

		return dao.findByUserName(usrName);
	}

}
