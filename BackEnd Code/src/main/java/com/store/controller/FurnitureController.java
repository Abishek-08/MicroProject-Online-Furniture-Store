package com.store.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.store.modal.Admin;
import com.store.modal.Furniture;
import com.store.service.FurnitureService;

import jakarta.ws.rs.core.HttpHeaders;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/furniture")
public class FurnitureController {

	@Autowired
	FurnitureService furnitureService;

	@PostMapping(path = "/addFurniture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> addFurniture(@RequestParam("furName") String furName,
			@RequestParam("furPrice") String furPrice, @RequestParam("furQuantity") int furQuantity,
			@RequestParam("furDetails") String furDetails, @RequestParam("furReviews") String furReviews,
			@RequestParam("furMeasurement") String furMeasurement, @RequestParam("adId") int adId,
			@RequestParam("file") MultipartFile file) throws IOException {

		Furniture furniture = new Furniture();
		furniture.setFurName(furName);
		furniture.setFurPrice(furPrice);
		furniture.setFurDetails(furDetails);
		furniture.setFurMeasurement(furMeasurement);
		furniture.setFurQuantity(furQuantity);
		furniture.setFurReviews(furReviews);
		furniture.setImage(Base64.getEncoder().encode(file.getBytes()));
		furniture.setImageName(file.getOriginalFilename());
		furniture.setImageType(file.getContentType());

		Admin admin = new Admin();
		admin.setAdId(adId);
		furniture.setAdmin(admin);

		try {
			furnitureService.addFurniture(furniture);
			return ResponseEntity.ok("Saved Successfully!!");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Furniture save failure");
		}

	}

//	@PutMapping("/updateFurniture")
//	public ResponseEntity<String> updateFurniture(@RequestBody Furniture furniture) {
//		try {
//			furnitureService.updateFurniture(furniture);
//			return ResponseEntity.ok("Update success");
//		} catch (Exception e) {
//			return ResponseEntity.badRequest().body("updation failure");
//		}
//
//	}

	@GetMapping("/findFurImage/{id}")
	public ResponseEntity<ByteArrayResource> findFurnitureById(@PathVariable("id") int id) {
		try {
			Furniture fur = furnitureService.findFurById(id);
			byte[] image = Base64.getDecoder().decode(fur.getImage());
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(fur.getImageType()))
					.header(HttpHeaders.CONTENT_DISPOSITION, "attachment: filename=\"" + fur.getImageName() + "\"")
					.body(new ByteArrayResource(image));
		} catch (Exception e) {
			return null;
		}
	}

	@GetMapping("/findAllFurniture")
	public List<Furniture> getFurnitureList() {
		return furnitureService.getFurnitureList();
	}

	@DeleteMapping("/deleteFurnitureId/{id}")
	public ResponseEntity<String> deleteFurniture(@PathVariable("id") int id) {
		try {
			furnitureService.deleteFurnitureId(id);
			return ResponseEntity.ok("deletion success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Deletion failure");
		}
	}

	@GetMapping("/findById/{id}")
	public Furniture doFindById(@PathVariable("id") int id) {
		try {
			return furnitureService.findFurById(id);
		} catch (Exception e) {
			return null;
		}
	}
	
	@PutMapping(path = "/updateFurniture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> updateFurniture(@RequestParam("furName") String furName,
			@RequestParam("furPrice") String furPrice, @RequestParam("furQuantity") int furQuantity,
			@RequestParam("furDetails") String furDetails, @RequestParam("furReviews") String furReviews,
			@RequestParam("furMeasurement") String furMeasurement, @RequestParam("adId") int adId,@RequestParam("furId")int furId,
			@RequestParam("file") MultipartFile file) throws IOException {

		Furniture furniture = new Furniture();
		furniture.setFurId(furId);
		furniture.setFurName(furName);
		furniture.setFurPrice(furPrice);
		furniture.setFurDetails(furDetails);
		furniture.setFurMeasurement(furMeasurement);
		furniture.setFurQuantity(furQuantity);
		furniture.setFurReviews(furReviews);
		furniture.setImage(Base64.getEncoder().encode(file.getBytes()));
		furniture.setImageName(file.getOriginalFilename());
		furniture.setImageType(file.getContentType());

		Admin admin = new Admin();
		admin.setAdId(adId);
		furniture.setAdmin(admin);

		try {
			furnitureService.updateFurniture(furniture);
			return ResponseEntity.ok("update Successfully!!");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("Furniture update failure");
		}

	}

}
