import { ContentResponse, SingleContentResponse } from './types/cms';

// wrap fetch with Bearer token

const baseCmsFetch = async <R>(uri: string, options: RequestInit = {}) => {
  const token = process.env.CMS_API_KEY;
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  const response = await fetch(`${process.env.CMS_API_HOST}${uri}`, options);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return (await response.json()) as R;
};

export const cmsFetch = async <T>(uri: string, options: RequestInit = {}) =>
  baseCmsFetch<ContentResponse<T>>(uri, options);

export const cmsFetchSingle = async <T>(uri: string, options: RequestInit = {}) =>
  baseCmsFetch<SingleContentResponse<T>>(uri, options);
