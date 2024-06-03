package com.store.modal;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Furniture")
public class Furniture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int furId;
	private String furName;
	private String furPrice;
	private int furQuantity;
	private String furDetails;
	private String furMeasurement;
	private String furReviews;
	
	@Lob
	@Column(name="Image", columnDefinition = "LONGBLOB")
	private byte[] image;
	
	private String imageName;
	private String imageType;
	
	@ManyToOne(targetEntity = Admin.class,cascade = CascadeType.DETACH)
	@JoinColumn(name="adId")
	private Admin admin;

	public Furniture() {
		super();
		
	}

	public Furniture(int furId, String furName, String furPrice, int furQuantity, String furDetails,
			String furMeasurement, String furReviews, byte[] image, String imageName, String imageType, Admin admin) {
		super();
		this.furId = furId;
		this.furName = furName;
		this.furPrice = furPrice;
		this.furQuantity = furQuantity;
		this.furDetails = furDetails;
		this.furMeasurement = furMeasurement;
		this.furReviews = furReviews;
		this.image = image;
		this.imageName = imageName;
		this.imageType = imageType;
		this.admin = admin;
	}

	public int getFurId() {
		return furId;
	}

	public void setFurId(int furId) {
		this.furId = furId;
	}

	public String getFurName() {
		return furName;
	}

	public void setFurName(String furName) {
		this.furName = furName;
	}

	public String getFurPrice() {
		return furPrice;
	}

	public void setFurPrice(String furPrice) {
		this.furPrice = furPrice;
	}

	public int getFurQuantity() {
		return furQuantity;
	}

	public void setFurQuantity(int furQuantity) {
		this.furQuantity = furQuantity;
	}

	public String getFurDetails() {
		return furDetails;
	}

	public void setFurDetails(String furDetails) {
		this.furDetails = furDetails;
	}

	public String getFurMeasurement() {
		return furMeasurement;
	}

	public void setFurMeasurement(String furMeasurement) {
		this.furMeasurement = furMeasurement;
	}

	public String getFurReviews() {
		return furReviews;
	}

	public void setFurReviews(String furReviews) {
		this.furReviews = furReviews;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}

	public String getImageType() {
		return imageType;
	}

	public void setImageType(String imageType) {
		this.imageType = imageType;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	
	
	

}
