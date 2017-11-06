package com.lion.iot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.lion.iot.service.DemoService;

@Controller
public class HomeController {
	@Autowired
	DemoService demoService;

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String searchFlightPage(String name) {
		demoService.test("aayush");
		return "login";
	}
}
