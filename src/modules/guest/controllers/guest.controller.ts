import { GuestService } from "@guest/services/guest.service";
import { ButtonProps, GuestView } from "@guest/views/guest.view";
import { Controller } from "@shared/controllers/controller";

export class GuestController extends Controller {
  constructor(
    private readonly view: GuestView,
    private readonly guestService: GuestService
  ) {
    super();
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public init() {
    this.guestService.get({ limit: 10, offset: 0 }).then((guests) => {
      const tableWithButtonsProps = guests.map((guest) => {
        const buttonProps: ButtonProps[] = [
          {
            label: "Edit",
            type: "button",
            onClickEvent: () => {
              this.view.renderForm(guest);
              this.view.renderSubmitButton(() => {
                const inputs = this.view.readFormInputs();
                this.guestService
                  .update({
                    id: guest.id,
                    name: inputs.name,
                    email: inputs.email,
                    phone: inputs.phone,
                  })
                  .then(() => this.init());
              });
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
      this.view.renderCreateNewButton(() => {
        this.view.renderForm();
        this.view.renderSubmitButton(() => {
          const inputs = this.view.readFormInputs();
          this.guestService.create(inputs);
        });
      });
    });
  }

  public clean() {
    this.view.clean();
  }
}
