package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.store.modal.CartItems;
import com.store.modal.Customer;
import com.store.modal.Furniture;
import com.store.modal.OrderItems;
import com.store.modal.Shipping;
import com.store.service.CartService;
import com.store.service.CustomerService;
import com.store.service.FurnitureService;
import com.store.service.MailService;
import com.store.service.OrderService;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/order")
public class OrderController {

	@Autowired
	OrderService orderService;

	@Autowired
	CartService cartService;

	@Autowired
	FurnitureService furnitureService;

	@Autowired
	MailService mailService;

	@Autowired
	CustomerService customerSerice;

	@PostMapping(path = "/insertOrder", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> insertOrder(@RequestParam("orderDate") String OrderDate,
			@RequestParam("orderAmount") String orderAmount, @RequestParam("cusId") int cusId,
			@RequestParam("shipId") int shipId, @RequestParam("cusEmail") String cusEmail,
			@RequestParam("cusName") String cusName) {

		List<Integer> furnitureList = cartService.getItemIdList(cusId);
		// String flag = "";

		try {

			for (int id : furnitureList) {

//			if (orderService.validateOrderByCusIdItemId(cusId, id)) {
//				flag = Integer.toString(id);
//			} else {
				OrderItems orderItems = new OrderItems();
				orderItems.setOrderDateOfOrder(OrderDate);
				orderItems.setOrderDateOfDelivery("Delivery Date upating");
				orderItems.setOrderStatus("Order Conform");
				orderItems.setOrderAmount(orderAmount);

				Customer customer = new Customer();
				customer.setCusId(cusId);
				Shipping shipping = new Shipping();
				shipping.setShipId(shipId);

				Furniture furniture = new Furniture();
				furniture.setFurId(id);

				CartItems cartItems = cartService.findCartItemsByCusIdByItemId(id, cusId);
				orderItems.setOrderQuantity(cartItems.getItemQuantity());

				furnitureService.updateFurnitureQuantity(id, cartItems.getItemQuantity());

				orderItems.setCustomer(customer);
				orderItems.setFurniture(furniture);
				orderItems.setShipping(shipping);

				orderService.insertOrder(orderItems);

				Furniture mailFurItem = furnitureService.findFurById(id);
				String furName = mailFurItem.getFurName();
				mailService.sendMail(cusEmail, furName, orderAmount,cusName);

//				flag = "success";
			}
			return ResponseEntity.ok("order placed");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("order placed failure");
		}

//		if (flag == "success") {
//			return ResponseEntity.ok("order placed");
//		} else {
//			return ResponseEntity.badRequest().body(flag);
//		}

	}

	@GetMapping("/findAllByCusId/{id}")
	public List<OrderItems> getAllOrderById(@PathVariable("id") int id) {
		return orderService.findAllOrdersByCusId(id);
	}

	@GetMapping("/findAllOrders")
	public List<OrderItems> getAllOrders() {
		return orderService.findAllOrders();
	}

	@GetMapping("/findOrderByOrderId/{id}")
	public OrderItems doFindById(@PathVariable("id") int id) {
		return orderService.findByOrderId(id);
	}

	@PutMapping("/updateOrder")
	public ResponseEntity<String> doUpdate(@RequestBody OrderItems orderItems) {
		try {
			orderService.updateOrder(orderItems);
			return ResponseEntity.ok("updation success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("updation failure");
		}
	}

	@DeleteMapping("/deleteOrder/{id}")
	public ResponseEntity<String> doDelete(@PathVariable("id") int id) {
		try {
			orderService.deleteOrderById(id);
			return ResponseEntity.ok("deletion success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("deletion failure");
		}
	}

	@DeleteMapping("/cancelOrder/{cusId}/{orderId}")
	public ResponseEntity<String> doCancelOrder(@PathVariable("cusId") int cusId,
			@PathVariable("orderId") int orderId) {
		try {

			Customer customer = customerSerice.findCustomerByCusId(cusId);
			String cusEmail = customer.getCusEmail();
			String cusName = customer.getCusName();
			OrderItems orderItems = orderService.findByOrderId(orderId);
			int ordId = orderItems.getOrderId();
			Furniture furniture = orderItems.getFurniture();
			String furName = furniture.getFurName();
			mailService.cancelMail(cusEmail, furName, ordId, cusName);

			orderService.cancelOrderByCustomer(cusId, orderId);

			return ResponseEntity.ok("cancel order success");
		} catch (Exception e) {
			return ResponseEntity.badRequest().body("cancel order failure");
		}
	}

}
