package com.lion.iot.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "userdeviceinformation")
public class UserDeviceInformationPojo {
	@Id
	@GeneratedValue
	
	@Column(name="id")
	private Integer id;

	@Column(name="userid")
	private Integer userid;
	
	@Column(name="devicename")
	private String devicename;
	
	@Column(name="state")
	private String state;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getDevicename() {
		return devicename;
	}

	public void setDevicename(String devicename) {
		this.devicename = devicename;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}