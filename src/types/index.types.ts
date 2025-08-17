import type { ComponentType } from "react"

export interface ISendOtp {
    email: string
}

export interface IVerifyOtp {
    email: string
    otp:string
}

export interface ILogin{
    email:string
    password:string
}

export interface IResponseSendOtp<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}
export interface IResponseVerifyOtp<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
}

export interface ISidebarItem {
  title: string
  items: {
    title: string
    url: string
    component: ComponentType
  }[]
}

