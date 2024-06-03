package com.store.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name="Customer")
public class Customer {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cusId;
	private String cusName;
	private String cusAge;
	private String cusMobile;
	private String cusLocation;
	private String cusGender;
	private String cusEmail;
	private String cusPassword;
	
	@Lob
	@Column(name="Image" ,columnDefinition = "LONGBLOB")
	private byte[] image;
	
	private String imageType;
	private String imageName;
	
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Customer(int cusId, String cusName, String cusAge, String cusMobile, String cusLocation, String cusGender,
			String cusEmail, String cusPassword, byte[] image, String imageType, String imageName) {
		super();
		this.cusId = cusId;
		this.cusName = cusName;
		this.cusAge = cusAge;
		this.cusMobile = cusMobile;
		this.cusLocation = cusLocation;
		this.cusGender = cusGender;
		this.cusEmail = cusEmail;
		this.cusPassword = cusPassword;
		this.image = image;
		this.imageType = imageType;
		this.imageName = imageName;
	}

	public int getCusId() {
		return cusId;
	}

	public void setCusId(int cusId) {
		this.cusId = cusId;
	}

	public String getCusName() {
		return cusName;
	}

	public void setCusName(String cusName) {
		this.cusName = cusName;
	}

	public String getCusAge() {
		return cusAge;
	}

	public void setCusAge(String cusAge) {
		this.cusAge = cusAge;
	}

	public String getCusMobile() {
		return cusMobile;
	}

	public void setCusMobile(String cusMobile) {
		this.cusMobile = cusMobile;
	}

	public String getCusLocation() {
		return cusLocation;
	}

	public void setCusLocation(String cusLocation) {
		this.cusLocation = cusLocation;
	}

	public String getCusGender() {
		return cusGender;
	}

	public void setCusGender(String cusGender) {
		this.cusGender = cusGender;
	}

	public String getCusEmail() {
		return cusEmail;
	}

	public void setCusEmail(String cusEmail) {
		this.cusEmail = cusEmail;
	}

	public String getCusPassword() {
		return cusPassword;
	}

	public void setCusPassword(String cusPassword) {
		this.cusPassword = cusPassword;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getImageType() {
		return imageType;
	}

	public void setImageType(String imageType) {
		this.imageType = imageType;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	
}
