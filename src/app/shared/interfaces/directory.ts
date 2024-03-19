
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

export interface SubDirectoryResponse{
  page:    number;
  limit:   number;
  total:   number;
  next:    null;
  prev:    null;
  results: SubDirectory[];
}

export interface SubDirectory{
  id:          number;
  name:        string;
  directoryId: number;
  state:       string;
  Directory:   Directory;
}
