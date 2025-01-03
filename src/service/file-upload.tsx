import React, { useState } from "react";
import { uploadFileToAzure } from "./azureBlobService";

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null); // Correctly typing the file state
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Safely access the first file
    setFile(selectedFile || null); // Set file to null if no file is selected
  };

  const handleFileUpload = async () => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      return;
    }

    try {
      setUploadStatus("Uploading...");
      const fileUrl = await uploadFileToAzure(file);
      setUploadStatus(`File uploaded successfully! File URL: ${fileUrl}`);
    } catch (error) {
      setUploadStatus("File upload failed. Please try again.");
      console.error("Upload error:", error);
    }
  };

  return (
    <div>
      <h2>Azure File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default FileUpload;
