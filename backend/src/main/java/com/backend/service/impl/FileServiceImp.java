package com.backend.service.impl;
import com.backend.service.FileService;
import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Map;
import java.util.UUID;

@Service
public class FileServiceImp implements FileService {

    @Autowired
    private Cloudinary cloudnary;

    @Value("${cloudinary.cloud_name}")
    private String cloudName;

    
    @Override
    public String saveFile(MultipartFile file, String path) throws IOException {
        String orgName = file.getOriginalFilename();
        String ext = orgName.substring(orgName.lastIndexOf(".") + 1);

        String uniqueName = UUID.randomUUID().toString();

        String publicId = (path != null && !path.isBlank())
                ? path + "/" + uniqueName
                : uniqueName;

        Map uploadResult = cloudnary.uploader().upload(
                file.getBytes(),
                Map.of("public_id", publicId, "overwrite", false, "resource_type", "auto")
        );

        return uploadResult.get("public_id").toString();
    }

    
    @Override
    public void deleteFile(String path, String publicId) throws IOException {
        cloudnary.uploader().destroy(publicId, Map.of());
    }

   
    @Override
    public String updateFile(MultipartFile file, String path, String oldPublicId) throws IOException {
        deleteFile(path, oldPublicId);
        return saveFile(file, path);
    }

 
    @Override
    public InputStream readFile(String path, String publicId) throws IOException {
        try {
            String url = getFileUrl(publicId);
            return new URL(url).openStream();
        } catch (Exception e) {
            throw new IOException("File not found on Cloudinary: " + publicId);
        }
    }

 
    public String getFileUrl(String publicId) {
        return "https://res.cloudinary.com/" + cloudName + "/image/upload/" + publicId;
    }
}
