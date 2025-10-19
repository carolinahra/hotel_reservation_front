import { ButtonProps } from "@guest/views/guest.view";
import { RoomService } from "@room/services/room.service";
import { RoomView } from "@room/views/room.view";

export class RoomController {
  constructor(
    private readonly view: RoomView,
    private readonly roomService: RoomService
  ) {}

  public init() {
    return this.roomService
      .get({ limit: 10, offset: 0 })
      .then((rooms) => this.view.renderTable(rooms));
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public initTableWithButtons() {
    this.roomService.get({ limit: 10, offset: 0 }).then((rooms) => {
      const tableWithButtonsProps = rooms.map((room) => {
        const buttonProps: ButtonProps[] = [
          {
            label: "Edit",
            type: "button",
            onClickEvent: () => {
              this.view.renderForm(room);
            },
          },
          {
            label: "Delete",
            type: "button",
            onClickEvent: () => {
              this.roomService.delete({ name: room.name });
            },
          },
        ];
        return {
          row: room,
          buttonProps,
        };
      });

      this.view.renderTableWithButtons(tableWithButtonsProps);
    });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.roomService.create(inputs);
    });
  }
}
