import { ButtonProps } from "@guest/views/guest.view";
import { ReservationService } from "@reservation/services/reservation.service";
import { ReservationView } from "@reservation/views/reservation.view";

export class ReservationController {
  constructor(
    private readonly view: ReservationView,
    private readonly reservationService: ReservationService
  ) {}

  public init() {
    return this.reservationService
      .get({ limit: 10, offset: 0 })
      .then((reservations) => this.view.renderTable(reservations));
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public initTableWithButtons() {
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
