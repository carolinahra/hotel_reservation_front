import { ButtonProps } from "@guest/views/guest.view";
import { ReservationDetailService } from "@reservation/services/reservation-detail.service";
import { ReservationDetailView } from "@reservation/views/reservation-detail.view";
import { Controller } from "@shared/controllers/controller";

export class ReservationDetailController extends Controller {
  constructor(
    private readonly view: ReservationDetailView,
    private readonly reservationDetailService: ReservationDetailService
  ) {
    super();
  }

  public init() {
    return this.reservationDetailService
      .get({ limit: 10, offset: 0 })
      .then((reservationDetails) => this.view.renderTable(reservationDetails));
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public initTableWithButtons() {
    this.reservationDetailService
      .get({ limit: 10, offset: 0 })
      .then((reservationDetails) => {
        const tableWithButtonsProps = reservationDetails.map(
          (reservationDetail) => {
            const buttonProps: ButtonProps[] = [
              {
                label: "Edit",
                type: "button",
                onClickEvent: () => {
                  this.view.renderForm(reservationDetail);
                },
              },
              {
                label: "Delete",
                type: "button",
                onClickEvent: () => {
                  this.reservationDetailService.delete({
                    id: reservationDetail.id,
                  });
                },
              },
            ];
            return {
              row: reservationDetail,
              buttonProps,
            };
          }
        );

        this.view.renderTableWithButtons(tableWithButtonsProps);
      });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.reservationDetailService.create(inputs);
    });
  }
}
