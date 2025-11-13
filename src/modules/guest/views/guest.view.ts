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
    if (document.getElementById("guest-table")) {
      this.clean(document.getElementById("guest-table"));
    }
    const tableProps = guests.map((guest) => {
      return {
        row: guest,
      };
    });
    const table = this.table.render(tableProps);
    table.id = "guest-table";
    document.getElementById("app").appendChild(table);
  }

  public renderTableWithButtons(props: TableWithButtonProps[]) {
    if (document.getElementById("guest-table-with-buttons")) {
      this.clean(document.getElementById("guest-table-with-buttons"));
    }
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
    table.id = "guest-table-with-buttons";
    const div = document.getElementById("app");
    div.appendChild(table);
  }

  public renderForm(guest?: Guest) {
    if (document.getElementById("guest-form")) {
      const element = document.getElementById("guest-form");
      this.clean(element);
    }
    const form = this.form.render([
      {
        fieldName: "Name",
        type: "string",
        id: "guest-name-field",
        value: guest?.name ?? "",
      },
      {
        fieldName: "Email",
        type: "email",
        id: "guest-email-field",
        value: guest?.email ?? "",
      },
      {
        fieldName: "Phone",
        type: "tel",
        id: "guest-phone-field",
        value: guest?.phone ?? "",
      },
    ]);
    form.id = "guest-form";
    const div = document.getElementById("app");
    div.appendChild(form);
  }

  public renderSubmitButton(event: () => void) {
    const button = this.button.render({
      label: "Submit",
      type: "submit",
      onclickEvent: event,
    });
    document.getElementById("guest-form").appendChild(button);
  }

  public renderCreateNewButton(event: () => void) {
    if (document.getElementById("create-guest-button")) {
      this.clean(document.getElementById("create-guest-button"));
    }
    const button = this.button.render({
      label: "Create New Guest",
      type: "button",
      onclickEvent: event,
    });
    button.id = "create-guest-button";

    document.getElementById("app").appendChild(button);
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

  public clean(element?: HTMLElement) {
    const div = document.getElementById("app");
    if (element) {
      div.removeChild(element);
      return;
    }
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }
}
