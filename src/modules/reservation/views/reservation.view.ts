import { Reservation } from "@reservation/models/reservation";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}

interface TableWithButtonProps {
  row: Reservation;
  buttonProps: ButtonProps[];
}
export class ReservationView {
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}

  public renderTable(reservations: Reservation[]) {
    const tableProps = reservations.map((reservation) => {
      return {
        row: reservation,
      };
    });
    const table = this.table.render(tableProps);
    document.getElementById("reservation-table").appendChild(table);
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
    const docTable = document.getElementById("reservation-table-with-buttons");
    while (docTable.firstChild) {
      docTable.removeChild(docTable.firstChild);
    }
    docTable.appendChild(table);
  }

  public renderForm(reservation?: Reservation) {
    const form = this.form.render([
      {
        fieldName: "Guest ID",
        type: "number",
        id: "reservation-guest-id-field",
        value: reservation?.guestId != null ? String(reservation.guestId) : "",
      },
      {
        fieldName: "External Reference",
        type: "string",
        id: "reservation-external-reference-field",
        value: reservation?.externalReference ?? "",
      },
      {
        fieldName: "Total Price",
        type: "number",
        id: "reservation-total-price-field",
        value:
          reservation?.totalPrice != null ? String(reservation.totalPrice) : "",
      },
      {
        fieldName: "Payment Status",
        type: "string",
        id: "reservation-payment-status-field",
        value: reservation?.paymentStatus ?? "",
      },
      {
        fieldName: "Check In Date",
        type: "date",
        id: "reservation-checkin-date-status-field",
        value:
          reservation?.checkInDate != null
            ? String(reservation.checkInDate)
            : "",
      },
      {
        fieldName: "Check Out Date",
        type: "date",
        id: "reservation-checkout-date-status-field",
        value:
          reservation?.checkOutDate != null
            ? String(reservation.checkOutDate)
            : "",
      },
    ]);
    const docForm = document.getElementById("reservation-form-container");
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
      .getElementById("reservation-form-submit-button")
      .appendChild(button);
  }

  public readFormInputs() {
    const inputs = {
      guestId: Number(
        (
          document.getElementById(
            "reservation-guest-id-field"
          ) as HTMLInputElement
        ).value
      ),
      externalReference: (
        document.getElementById(
          "reservation-external-reference-field"
        ) as HTMLInputElement
      ).value,
      totalPrice: Number(
        (
          document.getElementById(
            "reservation-total-price-field"
          ) as HTMLInputElement
        ).value
      ),
      paymentStatus: (
        document.getElementById(
          "reservation-payment-status-field"
        ) as HTMLInputElement
      ).value,
      checkInDate: (
        document.getElementById(
          "reservation-checkin-date-field"
        ) as HTMLInputElement
      ).value,
      checkOutDate: (
        document.getElementById(
          "reservation-checkout-date-field"
        ) as HTMLInputElement
      ).value,
    };

    return inputs;
  }
}
