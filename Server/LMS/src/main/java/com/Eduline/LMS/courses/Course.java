package com.Eduline.LMS.courses;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "courses")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", nullable = false)
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "instructor_id")
	private Long instructorId;

	@Column(name = "keywords")
	private String keywords;

	@Column(name = "price")
	private Long price;

	@Column(name = "is_authorized", columnDefinition = "boolean default false")
	private Boolean isAuthorized = false;

	@Column(name = "is_published", columnDefinition = "boolean default false")
	private Boolean isPublished = false;;

	@Column(name = "is_deleted", columnDefinition = "boolean default false")
	private Boolean isDeleted = false;;

	@Column(name = "category_id")
	private Long categoryId;

	@Lob
	@Column(name = "thumbnail_url")
	private String thumbnail;

	@Column(name = "published_time")
	private Date publishedTime;

	public Course() {
	}

	public Course(String title, String description, Long instructorId, String keywords, Long price, Boolean isAuthorized, Boolean isPublished, Boolean isDeleted, Long categoryId, String thumbnail, Date publishedTime) {
		this.title = title;
		this.description = description;
		this.instructorId = instructorId;
		this.keywords = keywords;
		this.price = price;
		this.isAuthorized = isAuthorized;
		this.isPublished = isPublished;
		this.isDeleted = isDeleted;
		this.categoryId = categoryId;
		this.thumbnail = thumbnail;
		this.publishedTime = publishedTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getInstructorId() {
		return instructorId;
	}

	public void setInstructorId(Long instructorId) {
		this.instructorId = instructorId;
	}

	public String getKeywords() {
		return keywords;
	}

	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Boolean getIsPublished() {
		return isPublished;
	}

	public void setIsPublished(Boolean isPublished) {
		this.isPublished = isPublished;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Boolean getIsAuthorized() {
		return isAuthorized;
	}

	public void setIsAuthorized(Boolean isAuthorized) {
		this.isAuthorized = isAuthorized;
	}

	// Getter and Setter for categoryId
	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	// Getter and Setter for thumbnail
	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	public Date getPublishedTime(){
		return publishedTime;
	}

	public void setPublishedTime(Date publishedTime){
		this.publishedTime = publishedTime;
	}

}