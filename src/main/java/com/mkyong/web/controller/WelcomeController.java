package com.mkyong.web.controller;

import com.mkyong.web.entity.User;
import com.mkyong.web.service.UserService;
import com.mkyong.web.service.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

@Controller
public class WelcomeController {

//	private static final Logger logger =
//			LoggerFactory.getLogger(WelcomeController.class);

	@Autowired
	private UserService userService;

	@RequestMapping(value = { "/*", "/*/*" }, method = RequestMethod.GET)
	public String printWelcome(ModelMap model) {
		System.out.println("go to welcome contoller");


//		User user = new User();
//		user.setUsername("sasha");
//		user.setPassword("12345");
//		userService.addUser(user);

//		org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger("STDOUT");
//		log.debug("Hello world.");

//		logger.debug("welcome is executed");

		return "index";
	}

}
