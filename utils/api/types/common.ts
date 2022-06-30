export type BData<T> = {
  id: string;
  attributes: T;
}

export type ContentResponse<T> = {
  data: BData<T>[],
  meta: {
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