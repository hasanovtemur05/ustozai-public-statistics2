export interface IMarketTask {
  id: string;
  photo: string;
  points: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface IMarketTaskInput {
  photo: string;
  points: number;
  title: string;
  description: string;
}

export interface IMarketTaskEditBody {
  id: string;
  values: IMarketTaskInput;
}
