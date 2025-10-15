import { GuestController } from "@guest/controllers/guest.controller";
import { GuestService } from "@guest/services/guest.service";
import { GuestView } from "@guest/views/guest.view";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";
import { HTTPService, HTTPConfig } from "@shared/services/http.service";

interface ContainerProps {
  httpService?: HTTPService;
  guestController?: GuestController;
  guestView?: GuestView;
  tableComponent?: TableComponent;
  buttonComponent?: ButtonComponent;
  formComponent?: FormComponent;
  guestService?: GuestService;
}
interface ContainerConfig {
  http: HTTPConfig;
}

export class Container {
  private readonly props: ContainerProps = {};
  private config: ContainerConfig;
  constructor(config: ContainerConfig) {
    this.config = config;
  }

  get httpService() {
    if (this.props.httpService) {
      return this.props.httpService;
    }
    this.props.httpService = new HTTPService(this.config.http);
    return this.props.httpService;
  }
  get guestController() {
    if (this.props.guestController) {
      return this.props.guestController;
    }
    this.props.guestController = new GuestController(
      this.guestView,
      this.guestService
    );
    return this.props.guestController;
  }
  get guestService() {
    if (this.props.guestService) {
      return this.props.guestService;
    }
    this.props.guestService = new GuestService(this.httpService);
    return this.props.guestService;
  }
  get tableComponent() {
    if (this.props.tableComponent) {
      return this.props.tableComponent;
    }
    this.props.tableComponent = new TableComponent();
    return this.props.tableComponent;
  }

  get formComponent() {
    if (this.props.formComponent) {
      return this.formComponent;
    }
    this.props.formComponent = new FormComponent();
    return this.props.formComponent;
  }

  get buttonComponent() {
    if (this.props.buttonComponent) {
      return this.buttonComponent;
    }
    this.props.buttonComponent = new ButtonComponent();
    return this.props.buttonComponent;
  }

  get guestView() {
    if (this.props.guestView) {
      return this.props.guestView;
    }
    this.props.guestView = new GuestView(
      this.tableComponent,
      this.formComponent,
      this.buttonComponent
    );
    return this.props.guestView;
  }
}
