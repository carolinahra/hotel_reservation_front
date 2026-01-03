import { HTTPService } from "@shared/services/http.service";

export interface LoginProps {
  guestID: number;
  password: string;
}

export class LoginService {
  constructor(private readonly httpService: HTTPService) {}

  login(props: LoginProps) {
    return this.httpService.post("/login", props);
  }
}
