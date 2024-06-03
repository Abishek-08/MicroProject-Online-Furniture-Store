package com.store.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

	@Autowired
	private JavaMailSender mailsender;

	public void sendMail(String toMail, String itemName, String payment, String cusName) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("abi948407@gmail.com");
		message.setTo(toMail);

		int initalAmt = Integer.parseInt(payment) - 50;

		String subject = "Order Conformation mail from Abishek Furniture Store";
		String body = "Dear " + cusName + ",\n\n Invoice for your order\n\n Furniture Name: " + itemName
				+ "\n\nPayment Amount: " + initalAmt + "\n\nDelivery Charges: 50" + "\n\nTotal Price: " + payment
				+ "\n\n\n\n Thank You...!! ";

		message.setText(body);
		message.setSubject(subject);
		mailsender.send(message);
		System.out.println("sended");

	}

	public void cancelMail(String toMail, String itemName, int orderId, String cusName) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("abi948407@gmail.com");
		message.setTo(toMail);

		String ordId = Integer.toString(orderId);
		String subject = "Order Cancellation mail from Abishek Furniture Store";
		String body = "Dear " + cusName + ",\n\nYour order id: #" + ordId + "\n\n Furniture Name: " + itemName
				+ " is successfully cancelled\n\n\n\n Thank You...!! ";

		message.setText(body);
		message.setSubject(subject);
		mailsender.send(message);
		System.out.println("sended");

	}

}
