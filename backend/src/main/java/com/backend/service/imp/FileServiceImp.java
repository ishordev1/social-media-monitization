package com.backend.service.imp;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.service.FileService;

@Service
public class FileServiceImp implements FileService {

	@Override
	public String fileUpload(MultipartFile file, String path) throws IOException {
		String orgFileName = file.getOriginalFilename();
		String extension = orgFileName.substring(orgFileName.lastIndexOf("."));
		String tempFileName = UUID.randomUUID().toString();
		String tempFileNameWithExtension = tempFileName + extension;
		String pathWithImgName = path + tempFileNameWithExtension;

		File folder = new File(path);
		if (!folder.exists()) {
			folder.mkdir();
		}
		Files.copy(file.getInputStream(), Paths.get(pathWithImgName));
		return tempFileNameWithExtension;
	}

	@Override
	public String fileUpdate(String fileName, MultipartFile file, String path)
			throws IOException, FileNotFoundException {
		fileDelete(fileName, path);
		return fileUpload(file, path);
	}

	@Override
	public void fileDelete(String fileName, String path) throws IOException, FileNotFoundException {

		Path paths = Paths.get(path + fileName);
		Files.delete(paths);

	}

	@Override
	public InputStream fileRead(String fileName, String path) throws IOException {
		return new FileInputStream(path + fileName);
	}

}
