package com.Eduline.LMS.common;

public class LoginResponse {

	private Object user;
	private String userType;

	public LoginResponse(Object user, String userType) {
		this.user = user;
		this.userType = userType;
	}

	public Object getUser() {
		return user;
	}

	public void setUser(Object user) {
		this.user = user;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

}
