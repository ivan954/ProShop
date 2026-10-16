import { API_URL } from "../config";

const getImageUrl = (image) => {
  if (!image || /^(https?:)?\/\//.test(image) || image.startsWith("data:")) {
    return image;
  }

  const imagePath = image.startsWith("/") ? image : `/${image}`;

  if (imagePath.startsWith("/uploads/")) {
    return `${API_URL}${imagePath}`;
  }

  const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  return `${publicUrl}${imagePath}`;
};

export default getImageUrl;
