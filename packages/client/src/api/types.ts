export type TUserResponse = {
    id: number
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
    role: string
  };

export type TOAuthServiceIdResponse = {
    service_id: string
}

export type TOAuthSignInRequest = {
  code: string
  redirect_uri: string
}
