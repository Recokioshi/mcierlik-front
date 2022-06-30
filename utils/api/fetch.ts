// wrap fetch with Bearer token
export const cmsFetch = async (uri: string, options: RequestInit = {}) => {
  const token = process.env.CMS_API_KEY;
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  };
  const response = await fetch(`${process.env.CMS_API_HOST}${uri}`, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response;
}