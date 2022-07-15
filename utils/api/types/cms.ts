export type BData<T> = {
  id: string;
  attributes: T;
}

export type SingleContentResponse<T> = {
  data: BData<T>;
};


export type ContentResponse<T> = {
  data: BData<T>[],
  meta?: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  }
}

export type BaseAttributes = {
  createdAt:	string,
  updatedAt:	string,
  publishedAt?: string,
  createdBy: { data: BData<User> },
  updatedBy: { data: BData<User> },
}

export type ProductAttributes = BaseAttributes & {
  name: string,
  isActive: boolean,
  saleFrom: string,
  price: number,
  photo: SingleContentResponse<Photo>,
  shortDescription: string,
  fullDescription: string,
};

export type Role = {
}

export type User = BaseAttributes & {
  firstname:	string,
  lastname:	string,
  username:	string,
  email:	string,
  resetPasswordToken:	string,
  registrationToken:	string,
  isActive:	boolean,
  roles:	{
    data: BData<Role>[],
  },
  blocked:	boolean,
  preferedLanguage:	string,
}

export type Photo = BaseAttributes & {
  name: string,
  alternativeText: string,
  caption: string,
  width: number,
  height: number,
  formats: {},
  hash: string,
  ext: string,
  mime: string,
  size: number,
  url: string,
  previewUrl: string,
  provider: string,
  provider_metadata: {},
  relate: {},
}