import { ButtonProps } from "@guest/views/guest.view";
import { RoomSizeService } from "@room/services/room-size.service";
import { RoomSizeView } from "@room/views/room-size.view";
import { Controller } from "@shared/controllers/controller";

export class RoomSizeController extends Controller {
  constructor(
    private readonly view: RoomSizeView,
    private readonly roomSizeService: RoomSizeService
  ) {
    super();
  }

  public init() {
    return this.roomSizeService
      .get({ limit: 10, offset: 0 })
      .then((roomSizes) => this.view.renderTable(roomSizes));
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public initTableWithButtons() {
    this.roomSizeService.get({ limit: 10, offset: 0 }).then((roomSizes) => {
      const tableWithButtonsProps = roomSizes.map((roomSize) => {
        const buttonProps: ButtonProps[] = [
          {
            label: "Edit",
            type: "button",
            onClickEvent: () => {
              this.view.renderForm(roomSize);
            },
          },
          {
            label: "Delete",
            type: "button",
            onClickEvent: () => {
              this.roomSizeService.delete({ name: roomSize.name });
            },
          },
        ];
        return {
          row: roomSize,
          buttonProps,
        };
      });

      this.view.renderTableWithButtons(tableWithButtonsProps);
    });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.roomSizeService.create(inputs);
    });
  }
}
