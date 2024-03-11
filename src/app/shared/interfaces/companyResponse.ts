export interface CompanyResponse{
  page:    number;
    limit:   number;
    total:   number;
    next:    null;
    prev:    null;
    results: Company[];
}

export interface Company {
  id:             number;
  name:           string;
  email:          string;
  razon_social:   string;
  ruc:            string;
  distrito:       string;
  provincia:      string;
  address:        string;
  state:          string;
  Representative: SubManager | null;
  GeneralManager: SubManager | null;
  Supervisor:     SubManager | null;
  Sedes:          any[];
  createdAt:      Date;
  updatedAt:      Date;
}

export interface SubManager {
  id:        number;
  name:      string;
  dni:       string;
  email:     null;
  companyId: number;
  createdAt: Date;
  updatedAt: Date;
}
