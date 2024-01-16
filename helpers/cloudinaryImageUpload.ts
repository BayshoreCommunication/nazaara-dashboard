interface CloudinaryUploadResult {
  secureUrl: string;
  publicId: string;
}

export const cloudinaryImageUpload = async (
  file: File
): Promise<CloudinaryUploadResult> => {
  try {
    const preset = process.env.CLOUDINARY_PRESET_UPLOAD;

    if (!preset) {
      throw new Error("Cloudinary preset not configured");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    const res = await fetch(process.env.CLOUDINARY_URL as string, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(
        `Error uploading image: ${res.status} - ${res.statusText}`
      );
    }

    const data = await res.json();
    // console.log("data fro image", data);

    // const { secure_url, public_id } = data;
    return { secureUrl: data.secure_url, publicId: data.public_id };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // Re-throw the error for the calling code to handle if needed
  }
};
