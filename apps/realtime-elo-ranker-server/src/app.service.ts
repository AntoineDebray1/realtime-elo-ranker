import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private data: string[];

  constructor() {
    this.data = [];
  }

  addData(data: string) {
    this.data.push(data);
  }

  getData() {
    return this.data;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
