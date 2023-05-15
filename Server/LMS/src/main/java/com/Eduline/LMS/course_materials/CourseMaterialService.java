package com.Eduline.LMS.course_materials;

import com.Eduline.LMS.courses.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class CourseMaterialService {

	@Autowired
	private CourseMaterialRepository courseMaterialRepository;

	public List<CourseMaterial> getCourseMaterialsByCourseId(Long courseId) {
		return courseMaterialRepository.findByCourseId(courseId);
	}

	public CourseMaterial addCourseMaterial(CourseMaterial courseMaterial) {
		return courseMaterialRepository.save(courseMaterial);
	}

	public void deleteCourseMaterialById(Long id) {
		courseMaterialRepository.deleteById(id);
	}

	public String uploadFile(MultipartFile file) throws Exception {
		// Specify the directory where the file will be saved
		String directory = "http://127.0.0.1:8887/Material";

		// Create the directory if it doesn't exist
		Path path = Paths.get(directory);
		if (!Files.exists(path)) {
			Files.createDirectories(path);
		}

		// Get the original file name and generate a new unique file name
		String originalFileName = file.getOriginalFilename();
		String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;

		// Save the file to the specified directory with the unique file name
		Path filePath = Paths.get(directory + uniqueFileName);
		Files.write(filePath, file.getBytes());

		// Return the URL of the saved file
		String serverUrl = "http://127.0.0.1:8887/"; // Change this to the URL of your web server
		return serverUrl + uniqueFileName;
	}

	public CourseMaterial updateCourseMaterialById(Long id, CourseMaterial courseMaterial) {
		CourseMaterial existingCourseMaterial = courseMaterialRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Invalid Course Material ID"));

		if (courseMaterial.getTitle() != null) {
			existingCourseMaterial.setTitle(courseMaterial.getTitle());
		}
		if (courseMaterial.getDescription() != null) {
			existingCourseMaterial.setDescription(courseMaterial.getDescription());
		}
		if (courseMaterial.getCourseId() != null) {
			existingCourseMaterial.setCourseId(courseMaterial.getCourseId());
		}
		if (courseMaterial.getMaterialType() != null) {
			existingCourseMaterial.setMaterialType(courseMaterial.getMaterialType());
		}
		if (courseMaterial.getFileUrl() != null) {
			existingCourseMaterial.setFileUrl(courseMaterial.getFileUrl());
		}
		if (courseMaterial.getSequenceNumber() != null) {
			existingCourseMaterial.setSequenceNumber(courseMaterial.getSequenceNumber());
		}

		return courseMaterialRepository.save(existingCourseMaterial);
	}

	@Transactional
	public void deleteCourseMaterialByCourseId(Long courseId) {
		List<CourseMaterial> courseMaterials = courseMaterialRepository.findByCourseId(courseId);
		courseMaterialRepository.deleteAll(courseMaterials);
	}

}