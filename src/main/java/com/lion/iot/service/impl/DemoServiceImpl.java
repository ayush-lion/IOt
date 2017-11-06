package com.lion.iot.service.impl;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

import com.lion.iot.dao.DemoDao;
import com.lion.iot.model.UserDeviceInformationPojo;
import com.lion.iot.service.DemoService;

public class DemoServiceImpl implements DemoService{

	@Autowired
	DemoDao demoDao;

	@Override
	public boolean secureLogin(String email, String password, HttpSession session) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public List<UserDeviceInformationPojo> recentdata() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void test(String name) {
	demoDao.test(name);
	}	
}
