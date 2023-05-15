package com.Eduline.LMS.instructor;

import javax.persistence.*;

@Entity
@Table(name = "instructors")
public class Instructor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "password", nullable = false)
	private String password;

	@Column(name = "is_blocked", nullable = false)
	private boolean isBlocked = false;

	@Column(name = "is_authorized", nullable = false)
	private boolean isAuthorized = false;

	@Transient
	private String userType = "instructor";

	public Instructor() {
	}

	public Instructor(Integer id, String name, String email, String password, boolean isBlocked) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.isBlocked = isBlocked;
		this.isAuthorized = isAuthorized;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isBlocked() {
		return isBlocked;
	}

	public void setBlocked(boolean blocked) {
		isBlocked = blocked;
	}

	public boolean isAuthorized() {
		return isAuthorized;
	}

	public void setAuthorized(boolean authorized) {
		isAuthorized = authorized;
	}
}