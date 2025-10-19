import { Guest } from "@guest/models/guest";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}

interface TableWithButtonProps {
  row: Guest;
  buttonProps: ButtonProps[];
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
    const docTable = document.getElementById("guest-table-with-buttons");
    while (docTable.firstChild) {
      docTable.removeChild(docTable.firstChild);
    }
    docTable.appendChild(table);
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
    const docForm = document.getElementById("guest-form-container");
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
