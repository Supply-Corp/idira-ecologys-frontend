import { Company } from "./companyResponse";

export interface Sede{
  name:      string;
  address:   string;
  email:     string;
  companyId: number;
  state: string;
  Company:Company;
}

export interface SedeResponse{
  page:    number;
  limit:   number;
  total:   number;
  next:    null;
  prev:    null;
  results: Sede[];
}

export interface SedePayload{
  name:      string;
  address:   string;
  email:     string;
  companyId: number;
}
