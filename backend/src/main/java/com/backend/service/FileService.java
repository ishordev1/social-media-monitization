package com.backend.service;


import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
public String fileUpload(MultipartFile file,String path) throws IOException;
public String fileUpdate(String fileId,MultipartFile file,String path) throws IOException,FileNotFoundException;
public void fileDelete(String fileName,String path) throws IOException,FileNotFoundException;
public InputStream fileRead(String fileName,String path) throws IOException;

}
