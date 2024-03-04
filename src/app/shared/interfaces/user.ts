import { Roles } from "./roles";

export interface User {
    email:    string;
    name:     string;
    password: string;
    role:     Roles;
    sedeId:   string;
}
