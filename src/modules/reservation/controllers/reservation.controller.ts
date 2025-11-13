import { ButtonProps } from "@guest/views/guest.view";
import { ReservationService } from "@reservation/services/reservation.service";
import { ReservationView } from "@reservation/views/reservation.view";
import { Controller } from "@shared/controllers/controller";

export class ReservationController extends Controller {
  constructor(
    private readonly view: ReservationView,
    private readonly reservationService: ReservationService
  ) {
    super();
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public init() {
    this.reservationService
      .get({ limit: 10, offset: 0 })
      .then((reservations) => {
        const tableWithButtonsProps = reservations.map((reservation) => {
          const buttonProps: ButtonProps[] = [
            {
              label: "Edit",
              type: "button",
              onClickEvent: () => {
                this.view.renderForm(reservation);
                this.view.renderSubmitButton(() => {
                  const inputs = this.view.readFormInputs();
                  this.reservationService
                    .update({
                      id: reservation.id,
                      externalReference: inputs.externalReference,
                      totalPrice: inputs.totalPrice,
                      paymentStatus: inputs.paymentStatus,
                      checkInDate: inputs.checkInDate,
                      checkOutDate: inputs.checkOutDate,
                    })
                    .then(() => this.init());
                });
              },
            },
            {
              label: "Delete",
              type: "button",
              onClickEvent: () => {
                this.reservationService.delete({
                  externalReference: reservation.externalReference,
                });
              },
            },
          ];
          return {
            row: reservation,
            buttonProps,
          };
        });

        this.view.renderTableWithButtons(tableWithButtonsProps);
      });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.reservationService.create(inputs);
    });
  }
}
