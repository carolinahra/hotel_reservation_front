import { ReservationDetail } from "@reservation/models/reservation-detail";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}

interface TableWithButtonProps {
  row: ReservationDetail;
  buttonProps: ButtonProps[];
}
export class ReservationDetailView {
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}

  public renderTable(reservationDetails: ReservationDetail[]) {
    const tableProps = reservationDetails.map((reservationDetail) => {
      return {
        row: reservationDetail,
      };
    });
    const table = this.table.render(tableProps);
    document.getElementById("reservation-detail-table").appendChild(table);
  }

  public renderTableWithButtons(props: TableWithButtonProps[]) {
    const propsWithButtons = props.map((prop) => {
      const buttons = prop.buttonProps.map((buttonProp) => {
        return this.button.render({
          type: buttonProp.type,
          label: buttonProp.label,
          onclickEvent: buttonProp.onClickEvent,
        });
      });
      return {
        row: prop.row,
        buttons,
      };
    });
    const table = this.table.render(propsWithButtons);
    const docTable = document.getElementById(
      "reservation-detail-table-with-buttons"
    );
    while (docTable.firstChild) {
      docTable.removeChild(docTable.firstChild);
    }
    docTable.appendChild(table);
  }

  public renderForm(reservationDetail?: ReservationDetail) {
    const form = this.form.render([
      {
        fieldName: "Reservation ID",
        type: "number",
        id: "reservation-detail-reservation-id-field",
        value:
          reservationDetail?.reservationId != null
            ? String(reservationDetail.reservationId)
            : "",
      },
      {
        fieldName: "Room ID",
        type: "number",
        id: "reservation-detail-room-id-field",
        value:
          reservationDetail?.roomId != null
            ? String(reservationDetail.roomId)
            : "",
      },
      {
        fieldName: "Extra Service ID",
        type: "number",
        id: "reservation-detail-extra-service-id-field",
        value:
          reservationDetail?.extraServiceId != null
            ? String(reservationDetail.extraServiceId)
            : "",
      },
    ]);
    const docForm = document.getElementById(
      "reservation-detail-form-container"
    );
    while (docForm.firstChild) {
      docForm.removeChild(docForm.firstChild);
    }
    docForm.appendChild(form);
  }

  public renderSubmitButton(event: () => void) {
    const button = this.button.render({
      label: "Submit",
      type: "submit",
      onclickEvent: event,
    });
    document
      .getElementById("reservation-detail-form-submit-button")
      .appendChild(button);
  }

  public readFormInputs() {
    const inputs = {
      reservationId: Number(
        (
          document.getElementById(
            "reservation-detail-reservation-id-field"
          ) as HTMLInputElement
        ).value
      ),
      roomId: Number(
        (
          document.getElementById(
            "reservation-detail-room-id-field"
          ) as HTMLInputElement
        ).value
      ),
      extraServiceId: Number(
        (
          document.getElementById(
            "reservation-detail-extra-service-id-field"
          ) as HTMLInputElement
        ).value
      ),
    };

    return inputs;
  }
}
