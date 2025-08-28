package com.backend.service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

public interface FileService {
    String saveFile(MultipartFile file, String path) throws IOException;
    void deleteFile(String path, String fileName) throws IOException;
    String updateFile(MultipartFile file, String path, String fileName) throws IOException;
    InputStream readFile(String path, String fileName) throws IOException;
}
