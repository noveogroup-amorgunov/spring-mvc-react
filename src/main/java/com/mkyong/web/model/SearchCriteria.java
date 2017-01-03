package com.mkyong.web.model;

public class SearchCriteria {

	String username;
	String email;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "SearchCriteria [username=" + username + ", email=" + email + "]";
	}

}
