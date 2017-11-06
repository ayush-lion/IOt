package com.lion.iot.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import com.lion.iot.model.UserDeviceInformationPojo;

public interface DemoService {

	boolean secureLogin(String email, String password, HttpSession session);
	List<UserDeviceInformationPojo> recentdata();
	void test(String name);

}
