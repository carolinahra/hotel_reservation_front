import { ButtonProps } from "@guest/views/guest.view";
import { RoomService } from "@room/services/room.service";
import { RoomView } from "@room/views/room.view";
import { Controller } from "@shared/controllers/controller";
import { ExceptionService } from "@shared/services/exception.service";

export class RoomController extends Controller {
  constructor(
    private readonly view: RoomView,
    private readonly roomService: RoomService,
    private readonly exceptionService: ExceptionService
  ) {
    super();
  }

  public init() {
    this.roomService
      .get({ limit: 10, offset: 0 })
      .then((rooms) => {
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
      })
      .catch((error) => {
        this.exceptionService.handle(error);
      });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.roomService.create(inputs);
    });
  }
}
