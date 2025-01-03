import { BlobServiceClient } from "@azure/storage-blob";

const sasToken = "<YOUR_SAS_TOKEN>"; // Replace with your SAS token
const storageAccountName = "<YOUR_STORAGE_ACCOUNT_NAME>"; // Replace with your Storage Account name
const containerName = "<YOUR_CONTAINER_NAME>"; // Replace with your container name

// Create BlobServiceClient
const blobServiceClient = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net?${sasToken}`
);

export const uploadFileToAzure = async (file: Blob | ArrayBuffer | ArrayBufferView<ArrayBufferLike>) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(file instanceof Blob ? file.name : 'unknown.file');

    const uploadBlobResponse = await blobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: file instanceof Blob ? file.type : 'application/octet-stream' },
    });

    console.log("Upload complete:", uploadBlobResponse.requestId);
    return `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file instanceof Blob ? file.name : 'unknown.file'}`;
  } catch (error) {
    console.error("Error uploading file to Azure:", error);
    throw error;
  }
};

