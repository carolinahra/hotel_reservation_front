import { Guest } from "@guest/models/guest";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

interface TableWithEditButtonProps {
  row: Guest;
  event: () => void; // FIX
}
export class GuestView {
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}

  public renderTable(guests: Guest[]) {
    const tableProps = guests.map((guest) => {
      return {
        row: guest,
      };
    });
    const table = this.table.render(tableProps);
    document.getElementById("guest-table").appendChild(table);
  }

  public renderTableWithEditButton(props: TableWithEditButtonProps[]) {
    const propsWithButton = props.map((prop) => {
      const button = this.button.render({
        label: "Edit",
        type: "button",
        onclickEvent: prop.event,
      });
      return {
        row: prop.row,
        button: button,
      };
    });
    const table = this.table.render(propsWithButton);
    document.getElementById("guest-table-with-edit-button").appendChild(table);
  }

  public renderForm(guest?: Guest) {
    const form = this.form.render([
      {
        fieldName: "name",
        type: "string",
        id: "guest-name-field",
        value: guest?.name ?? "",
      },
      {
        fieldName: "email",
        type: "email",
        id: "guest-email-field",
        value: guest?.email ?? "",
      },
      {
        fieldName: "phone",
        type: "tel",
        id: "guest-phone-field",
        value: guest?.phone ?? "",
      },
    ]);
    document.getElementById("guest-form-container").appendChild(form);
  }

  public renderSubmitButton(event: () => void) {
    const button = this.button.render({
      label: "Submit",
      type: "submit",
      onclickEvent: event,
    });
    document.getElementById("guest-form-submit-button").appendChild(button);
  }

  public readFormInputs() {
    const inputs = {
      name: (document.getElementById("guest-name-field") as HTMLInputElement)
        .value,
      email: (document.getElementById("guest-email-field") as HTMLInputElement)
        .value,
      phone: (document.getElementById("guest-phone-field") as HTMLInputElement)
        .value,
    };

    return inputs;
  }
}
