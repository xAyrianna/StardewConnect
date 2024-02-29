import { Town } from "./town.interface"

export interface User{
    _id?: number
    username: string 
    name: string
    emailAddress: string
    password: string
    birthday: Date
    favoriteThing: string 
    memberSince: Date
    towns?: Town[]
}