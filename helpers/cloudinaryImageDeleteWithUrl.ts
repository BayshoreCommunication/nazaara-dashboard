import axios from "axios";
import crypto from "crypto";

export const cloudinaryImageDeleteWithUrl = async (imageUrl: string) => {
  const apiSecret = process.env.API_SECRET;
  const cloudName = process.env.CLOUD_NAME;
  const apiKey = process.env.API_KEY;
  const timestamp = new Date().getTime();

  if (!apiSecret || !cloudName || !apiKey) {
    console.error("Missing environment variables");
    throw new Error("Missing environment variables");
  }

  const regex = /\/upload\/([^/]+)\.\w+$/;
  //   const regex = /\/v\d+\/([^/]+)\.\w+$/;
  const regexPublicId = imageUrl.match(regex)?.[1];
  const publicId = `upload/${regexPublicId}`;

  if (!publicId) {
    console.error("Unable to extract publicId from the URL");
    throw new Error("Unable to extract publicId from the URL");
  }

  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = () => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const signature = generateSHA1(generateSignature());
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    // console.log("Deleting image with publicId:", publicId);
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    // console.log("Image deleted from Cloudinary:", response);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};
