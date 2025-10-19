import { Room } from "@room/models/room";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}

interface TableWithButtonProps {
  row: Room;
  buttonProps: ButtonProps[];
}
export class RoomView {
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}

  public renderTable(rooms: Room[]) {
    const tableProps = rooms.map((room) => {
      return {
        row: room,
      };
    });
    const table = this.table.render(tableProps);
    document.getElementById("room-table").appendChild(table);
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
    const docTable = document.getElementById("room-table-with-buttons");
    while (docTable.firstChild) {
      docTable.removeChild(docTable.firstChild);
    }
    docTable.appendChild(table);
  }

  public renderForm(room?: Room) {
    const form = this.form.render([
      {
        fieldName: "Name",
        type: "string",
        id: "room-name-field",
        value: room?.name ?? "",
      },
      {
        fieldName: "Room Size Id",
        type: "string",
        id: "room-room-size-id-field",
        value: room?.roomSizeId != null ? String(room.roomSizeId) : "",
      },
      {
        fieldName: "Price",
        type: "number",
        id: "room-price-field",
        value: room?.price != null ? String(room.price) : "",
      },
      {
        fieldName: "Availability",
        type: "string",
        id: "room-availability-field",
        value: room?.availability ?? "",
      },
    ]);
    const docForm = document.getElementById("room-form-container");
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
    document.getElementById("room-form-submit-button").appendChild(button);
  }

  public readFormInputs() {
    const inputs = {
      name: (document.getElementById("room-name-field") as HTMLInputElement)
        .value,
      roomSizeId: Number((
        document.getElementById("room-room-size-id-field") as HTMLInputElement
      ).value),
      price: Number((document.getElementById("room-price-field") as HTMLInputElement)
        .value),
      availability: (
        document.getElementById("room-availability-field") as HTMLInputElement
      ).value,
    };

    return inputs;
  }
}
