export interface Message {
  message: string;
}

export interface IResponse<Data = any> {
  data: Data;
  status: 'OK';
}
