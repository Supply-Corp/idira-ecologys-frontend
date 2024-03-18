
export interface DirectoryResponse{
  page:    number;
  limit:   number;
  total:   number;
  next:    null;
  prev:    null;
  results: Directory[];
}

export interface Directory {
  id:        number;
  name:      string;
  state:     string;
  createdAt: Date;
  updatedAt: Date;
}
