import { ExtraServiceController } from "@extra-service/controllers/extra-service.controller";
import { ExtraServiceService } from "@extra-service/services/extra-service.service";
import { ExtraServiceView } from "@extra-service/views/extra-service.view";
import { GuestController } from "@guest/controllers/guest.controller";
import { GuestService } from "@guest/services/guest.service";
import { GuestView } from "@guest/views/guest.view";
import { ReservationDetailController } from "@reservation/controllers/reservation-detail.controller";
import { ReservationController } from "@reservation/controllers/reservation.controller";
import { ReservationDetailService } from "@reservation/services/reservation-detail.service";
import { ReservationService } from "@reservation/services/reservation.service";
import { ReservationDetailView } from "@reservation/views/reservation-detail.view";
import { ReservationView } from "@reservation/views/reservation.view";
import { RoomSizeController } from "@room/controllers/room-size.controlller";
import { RoomController } from "@room/controllers/room.controller";
import { RoomSizeService } from "@room/services/room-size.service";
import { RoomService } from "@room/services/room.service";
import { RoomSizeView } from "@room/views/room-size.view";
import { RoomView } from "@room/views/room.view";
import { ButtonComponent } from "@shared/components/button.component";
import { ErrorMessageComponent } from "@shared/components/error-message.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";
import { ExceptionController } from "@shared/controllers/exception.controller";
import { Router, Routes } from "@shared/router/router";
import { ExceptionService } from "@shared/services/exception.service";
import { HTTPService, HTTPConfig } from "@shared/services/http.service";
import { ExceptionView } from "@shared/views/exception.view";

interface ContainerProps {
  httpService?: HTTPService;
  guestController?: GuestController;
  guestView?: GuestView;
  tableComponent?: TableComponent;
  buttonComponent?: ButtonComponent;
  formComponent?: FormComponent;
  errorMessageComponent?: ErrorMessageComponent;
  guestService?: GuestService;
  reservationView?: ReservationView;
  reservationService?: ReservationService;
  reservationController?: ReservationController;
  reservationDetailView?: ReservationDetailView;
  reservationDetailService?: ReservationDetailService;
  reservationDetailController?: ReservationDetailController;
  exceptionController?: ExceptionController;
  exceptionService?: ExceptionService;
  exceptionView?: ExceptionView;
  roomView?: RoomView;
  roomService?: RoomService;
  roomController?: RoomController;
  roomSizeView?: RoomSizeView;
  roomSizeService?: RoomSizeService;
  roomSizeController?: RoomSizeController;
  extraServiceView?: ExtraServiceView;
  extraServiceService?: ExtraServiceService;
  extraServiceController?: ExtraServiceController;
  router?: Router;
}
interface ContainerConfig {
  http: HTTPConfig;
  routes: string[];
}

export class Container {
  private readonly props: ContainerProps = {};
  private config: ContainerConfig;
  constructor(config: ContainerConfig) {
    this.config = config;
  }

  get errorMessageComponent() {
    if (this.props.errorMessageComponent) {
      return this.props.errorMessageComponent;
    }
    this.props.errorMessageComponent = new ErrorMessageComponent();
    return this.props.errorMessageComponent;
  }

  get exceptionView() {
    if (this.props.exceptionView) {
      return this.props.exceptionView;
    }
    this.props.exceptionView = new ExceptionView(this.errorMessageComponent);
    return this.props.exceptionView;
  }

  get exceptionService() {
    if (this.props.exceptionService) {
      return this.props.exceptionService;
    }
    this.props.exceptionService = new ExceptionService(this.exceptionView);
    return this.props.exceptionService;
  }

  get exceptionController() {
    if (this.props.exceptionController) {
      return this.props.exceptionController;
    }
    this.props.exceptionController = new ExceptionController(
      this.exceptionService
    );
    return this.props.exceptionController;
  }

  get httpService() {
    if (this.props.httpService) {
      return this.props.httpService;
    }
    this.props.httpService = new HTTPService(
      this.config.http,
      this.exceptionService
    );
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
      return this.props.formComponent;
    }
    this.props.formComponent = new FormComponent();
    return this.props.formComponent;
  }

  get buttonComponent() {
    if (this.props.buttonComponent) {
      return this.props.buttonComponent;
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

  get reservationView() {
    if (this.props.reservationView) {
      return this.props.reservationView;
    }
    this.props.reservationView = new ReservationView(
      this.tableComponent,
      this.formComponent,
      this.buttonComponent
    );
    return this.props.reservationView;
  }

  get reservationService() {
    if (this.props.reservationService) {
      return this.props.reservationService;
    }
    this.props.reservationService = new ReservationService(this.httpService);
    return this.props.reservationService;
  }

  get reservationController() {
    if (this.props.reservationController) {
      return this.props.reservationController;
    }
    this.props.reservationController = new ReservationController(
      this.reservationView,
      this.reservationService
    );
    return this.props.reservationController;
  }
  get reservationDetailView() {
    if (this.props.reservationDetailView) {
      return this.props.reservationDetailView;
    }
    this.props.reservationDetailView = new ReservationDetailView(
      this.tableComponent,
      this.formComponent,
      this.buttonComponent
    );
    return this.props.reservationDetailView;
  }

  get reservationDetailService() {
    if (this.props.reservationDetailService) {
      return this.props.reservationDetailService;
    }
    this.props.reservationDetailService = new ReservationDetailService(
      this.httpService
    );
    return this.props.reservationDetailService;
  }

  get reservationDetailController() {
    if (this.props.reservationDetailController) {
      return this.props.reservationDetailController;
    }
    this.props.reservationDetailController = new ReservationDetailController(
      this.reservationDetailView,
      this.reservationDetailService
    );
    return this.props.reservationDetailController;
  }
  get roomView() {
    if (this.props.roomView) {
      return this.props.roomView;
    }
    this.props.roomView = new RoomView(
      this.tableComponent,
      this.formComponent,
      this.buttonComponent
    );
    return this.props.roomView;
  }

  get roomService() {
    if (this.props.roomService) {
      return this.props.roomService;
    }
    this.props.roomService = new RoomService(this.httpService);
    return this.props.roomService;
  }

  get roomController() {
    if (this.props.roomController) {
      return this.props.roomController;
    }
    this.props.roomController = new RoomController(
      this.roomView,
      this.roomService,
      this.exceptionService
    );
    return this.props.roomController;
  }
  get roomSizeView() {
    if (this.props.roomSizeView) {
      return this.props.roomSizeView;
    }
    this.props.roomSizeView = new RoomSizeView(
      this.tableComponent,
      this.formComponent,
      this.buttonComponent
    );
    return this.props.roomSizeView;
  }

  get roomSizeService() {
    if (this.props.roomSizeService) {
      return this.props.roomSizeService;
    }
    this.props.roomSizeService = new RoomSizeService(this.httpService);
    return this.props.roomSizeService;
  }

  get roomSizeController() {
    if (this.props.roomSizeController) {
      return this.props.roomSizeController;
    }
    this.props.roomSizeController = new RoomSizeController(
      this.roomSizeView,
      this.roomSizeService
    );
    return this.props.roomSizeController;
  }

  get extraServiceView() {
    if (this.props.extraServiceView) {
      return this.props.extraServiceView;
    }
    this.props.extraServiceView = new ExtraServiceView(
      this.tableComponent,
      this.formComponent,
      this.buttonComponent
    );
    return this.props.extraServiceView;
  }

  get extraServiceService() {
    if (this.props.extraServiceService) {
      return this.props.extraServiceService;
    }
    this.props.extraServiceService = new ExtraServiceService(this.httpService);
    return this.props.extraServiceService;
  }

  get extraServiceController() {
    if (this.props.extraServiceController) {
      return this.props.extraServiceController;
    }
    this.props.extraServiceController = new ExtraServiceController(
      this.extraServiceView,
      this.extraServiceService
    );
    return this.props.extraServiceController;
  }

  get router() {
    if (this.props.router) {
      return this.props.router;
    }
    this.props.router = new Router(
      this.config.routes,
      this.roomController,
      this.guestController,
      this.roomSizeController,
      this.reservationController,
      this.reservationDetailController,
      this.extraServiceController
    );
    return this.props.router;
  }
}
