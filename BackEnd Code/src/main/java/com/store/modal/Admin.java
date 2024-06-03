package com.store.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Admin")
public class Admin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int adId;
	private String adName;
	private String adMobile;
	private String adGender;
	private String adLocation;
	private String adUserName;
	private String adPassword;
	
	public Admin() {
		super();
		
	}

	public Admin(int adId, String adName, String adMobile, String adGender, String adLocation, String adUserName,
			String adPassword) {
		super();
		this.adId = adId;
		this.adName = adName;
		this.adMobile = adMobile;
		this.adGender = adGender;
		this.adLocation = adLocation;
		this.adUserName = adUserName;
		this.adPassword = adPassword;
	}

	public int getAdId() {
		return adId;
	}

	public void setAdId(int adId) {
		this.adId = adId;
	}

	public String getAdName() {
		return adName;
	}

	public void setAdName(String adName) {
		this.adName = adName;
	}

	public String getAdMobile() {
		return adMobile;
	}

	public void setAdMobile(String adMobile) {
		this.adMobile = adMobile;
	}

	public String getAdGender() {
		return adGender;
	}

	public void setAdGender(String adGender) {
		this.adGender = adGender;
	}

	public String getAdLocation() {
		return adLocation;
	}

	public void setAdLocation(String adLocation) {
		this.adLocation = adLocation;
	}

	public String getAdUserName() {
		return adUserName;
	}

	public void setAdUserName(String adUserName) {
		this.adUserName = adUserName;
	}

	public String getAdPassword() {
		return adPassword;
	}

	public void setAdPassword(String adPassword) {
		this.adPassword = adPassword;
	}
	
	

}
