import axios from "axios";
import crypto from "crypto";

export const cloudinaryImageDelete = async (publicId: string) => {
  const apiSecret = process.env.API_SECRET;

  const generateSHA1 = (data: any) => {
    const hash = crypto.createHash("sha1");
    hash.update(data);
    return hash.digest("hex");
  };

  const generateSignature = (
    publicId: string,
    apiSecret: string | undefined
  ) => {
    const timestamp = new Date().getTime();
    return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  };

  const cloudName = process.env.CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = process.env.API_KEY;

  const signature = generateSHA1(generateSignature(publicId, apiSecret));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
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
