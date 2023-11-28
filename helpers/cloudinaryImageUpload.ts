const cloudinaryImageUpload = async (file: any, folder: string) => {
  let preset = "";

  switch (folder) {
    case "products":
      preset = process.env.CLOUDINARY_PRESET_PRODUCTS as string;
      break;
    case "upload":
      preset = process.env.CLOUDINARY_PRESET_UPLOAD as string;
      break;
    default:
      throw new Error("Invalid folder specified");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const res = await fetch(`${process.env.CLOUDINARY_URL}/${folder}` as string, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  const data = await res.json();
  return data.secure_url;
};

export { cloudinaryImageUpload };
