package com.lion.iot.dao.impl;

import javax.sql.DataSource;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DBConnectionDao {

	protected DataSource dataSource;
	private static SessionFactory sessionFactory = null;
	protected NamedParameterJdbcTemplate namedJdbcTemplate = null;

	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		namedJdbcTemplate = new NamedParameterJdbcTemplate(dataSource);
	}

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		DBConnectionDao.sessionFactory = sessionFactory;
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

	public static Session openSession() {
		Session session = getSessionFactory().openSession();
		return session;
	}

	public static Session getCurrentSession() {
		Session session = getSessionFactory().getCurrentSession();
		return session;
	}

	public static HibernateTemplate getHibernateTemplate() {
		HibernateTemplate hibernateTemplate = new HibernateTemplate(getSessionFactory());
		return hibernateTemplate;
	}
}
