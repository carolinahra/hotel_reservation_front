import { GuestService } from "@guest/services/guest.service";
import { ButtonProps, GuestView } from "@guest/views/guest.view";

export class GuestController {
  constructor(
    private readonly view: GuestView,
    private readonly guestService: GuestService
  ) {}

  public init() {
    return this.guestService
      .get({ limit: 10, offset: 0 })
      .then((guests) => this.view.renderTable(guests));
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public initTableWithButtons() {
    this.guestService.get({ limit: 10, offset: 0 }).then((guests) => {
      const tableWithButtonsProps = guests.map((guest) => {
        const buttonProps: ButtonProps[] = [
          {
            label: "Edit",
            type: "button",
            onClickEvent: () => {
              this.view.renderForm(guest);
            },
          },
          {
            label: "Delete",
            type: "button",
            onClickEvent: () => {
              this.guestService.delete({ email: guest.email });
            },
          },
        ];
        return {
          row: guest,
          buttonProps,
        };
      });

      this.view.renderTableWithButtons(tableWithButtonsProps);
    });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.guestService.create(inputs);
    });
  }
}
