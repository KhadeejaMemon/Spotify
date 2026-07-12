const BACKEND_URL = "https://spotify-backend-gilt.vercel.app";

export const getMediaUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http")) {
    return path;
  }

  return BACKEND_URL + path;
};