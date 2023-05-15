package com.Eduline.LMS.instructor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
	Instructor findByEmail(String email);

	List<Instructor> findByIsAuthorized(boolean isAuthorized);
}
