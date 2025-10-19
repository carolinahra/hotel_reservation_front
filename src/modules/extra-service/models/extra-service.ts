export interface ExtraService {
  id: number;
  name: string;
  price: number;
}

export class ExtraService {
  id: number;
  name: string;
  price: number;
  constructor(extraService: ExtraService) {
    this.id = extraService.id;
    this.name = extraService.name;
    this.price = extraService.price;
  }
}
