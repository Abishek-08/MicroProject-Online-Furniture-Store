package com.store.service;

import com.store.modal.Admin;

public interface AdminService {
	
	public void registerAdmin(Admin admin);
	public boolean validateAdminUserName(String UsName);
	public boolean validateAdminLogIn(String usrName,String password);
	public Admin findByUserName(String usrName);
	

}
