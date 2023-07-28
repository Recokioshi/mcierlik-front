import { Color } from './common';

export type BData<T> = {
  id: string;
  attributes: T;
};

export type SingleContentResponse<T> = {
  data: BData<T>;
};

export type ContentResponse<T> = {
  data: BData<T>[];
  meta?: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

export type OptionalContentResponse<T, CR extends ContentResponse<T> | SingleContentResponse<T>> = Omit<CR, 'data'> & {
  data: CR['data'] | null;
};

export type Role = Record<string, never>;

export type UserBase = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  resetPasswordToken: string;
  registrationToken: string;
  isActive: boolean;
  roles: {
    data: BData<Role>[];
  };
  blocked: boolean;
  preferedLanguage: string;
};

export type BaseAttributes = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  createdBy: { data: BData<UserBase & BaseAttributes> };
  updatedBy: { data: BData<UserBase & BaseAttributes> };
};

type BasePhoto = {
  name: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider_metadata: Record<string, never>;
};

export type PhotoAttributes = BaseAttributes &
  BasePhoto & {
    alternativeText: string;
    caption: string;
    formats?: {
      thumbnail?: BasePhoto;
      small?: BasePhoto;
      medium?: BasePhoto;
      large?: BasePhoto;
    };
    previewUrl: string;
    provider: string;
    relate: Record<string, never>;
  };

export type Photo = PhotoAttributes & {
  id: BData<PhotoAttributes>['id'];
};

export type ProductAttributes = BaseAttributes & {
  name: string;
  isActive: boolean;
  saleFrom?: string;
  price: number;
  photo: SingleContentResponse<PhotoAttributes>;
  gallery: OptionalContentResponse<PhotoAttributes, ContentResponse<PhotoAttributes>>;
  features?: string[];
  colors?: Record<string, Color>;
  shortDescription: string;
  fullDescription: string;
};

export type Product = Omit<ProductAttributes, 'photo' | 'gallery' | 'features' | 'colors'> & {
  id: BData<ProductAttributes>['id'];
  photo: Photo;
  gallery: Photo[];
  features: string[];
  colors: Record<string, Color>;
};

export type CartProduct = {
  id: Product['id'];
  quantity: number;
  color: string;
};
