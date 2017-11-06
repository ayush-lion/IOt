package com.lion.iot.dao.impl;

import org.hibernate.Session;
import org.springframework.orm.hibernate4.HibernateTemplate;

import com.lion.iot.dao.DemoDao;
import com.lion.iot.model.Demo;

public class DemoDaoImpl implements DemoDao {

	@Override
	public void test(String name) {

		Demo obj = new Demo();
		obj.setName(name);
		System.out.println("value ye h : " + name);
		Session session = DBConnectionDao.openSession();
		session.save(obj);
		//HibernateTemplate hibernateTemplate = DBConnectionDao.getHibernateTemplate();
		//hibernateTemplate.save(obj);
		if (null != session) {
			session.close();
		}
	}
}
