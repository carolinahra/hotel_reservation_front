import { GuestService } from "@guest/services/guest.service";
import { GuestView } from "@guest/views/guest.view";

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

  public initTableWithEditButton() {
    this.guestService.get({ limit: 10, offset: 0 }).then((guests) => {
      const tableWithEditButtonsProps = guests.map((guest) => {
        return {
          row: guest,
          event: () => {
            this.view.renderForm(guest);
          },
        };
      });
      this.view.renderTableWithEditButton(tableWithEditButtonsProps);
    });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.guestService.create(inputs);
    });
  }
}
