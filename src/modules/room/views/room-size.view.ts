import { RoomSize } from "@room/models/room-size";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}

interface TableWithButtonProps {
  row: RoomSize;
  buttonProps: ButtonProps[];
}
export class RoomSizeView {
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}

  public renderTable(roomSizes: RoomSize[]) {
    const tableProps = roomSizes.map((roomSize) => {
      return {
        row: roomSize,
      };
    });
    const table = this.table.render(tableProps);
    document.getElementById("roomSize-table").appendChild(table);
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
    const docTable = document.getElementById("roomSize-table-with-buttons");
    while (docTable.firstChild) {
      docTable.removeChild(docTable.firstChild);
    }
    docTable.appendChild(table);
  }

  public renderForm(roomSize?: RoomSize) {
    const form = this.form.render([
      {
        fieldName: "Name",
        type: "string",
        id: "room-size-name-field",
        value: roomSize?.name ?? "",
      },
      {
        fieldName: "Size",
        type: "string",
        id: "room-size-size-field",
        value: roomSize?.size ?? "",
      },
    ]);
    const docForm = document.getElementById("room-size-form-container");
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
    document.getElementById("room-size-form-submit-button").appendChild(button);
  }

  public readFormInputs() {
    const inputs = {
      name: (document.getElementById("room-size-name-field") as HTMLInputElement)
        .value,
      size: (
        document.getElementById("room-size-size-field") as HTMLInputElement
      ).value,
    };

    return inputs;
  }
}
