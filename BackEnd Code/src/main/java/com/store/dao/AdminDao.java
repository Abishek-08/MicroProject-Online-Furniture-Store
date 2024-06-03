package com.store.dao;

import com.store.modal.Admin;

public interface AdminDao {
	
	public void insertAdmin(Admin admin);
	public boolean validateAdminUserName(String usName);
	public Admin validateAdminLogIn(String usrName,String password);
	public Admin findByUserName(String usName);
	
	

}
