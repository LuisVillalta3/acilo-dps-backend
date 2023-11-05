/* eslint-disable prettier/prettier */
export class SuccessResponse<T> {
  constructor(
    public message: string,
    public statusCode: number,
    public success: boolean = true,
    public data?: T,
  ) {}
}
