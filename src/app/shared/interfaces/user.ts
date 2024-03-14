import { Roles } from "./roles";

export interface UserResponse{
  page:    number;
    limit:   number;
    total:   number;
    next:    null;
    prev:    null;
    results: User[];
}

export interface User {
    id:number;
    email:    string;
    name:     string;
    password: string;
    role:     Roles;
    sedeId:   string;
}
