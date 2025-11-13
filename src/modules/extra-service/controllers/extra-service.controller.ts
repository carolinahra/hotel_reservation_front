import { ExtraServiceService } from "@extra-service/services/extra-service.service";
import { ExtraServiceView } from "@extra-service/views/extra-service.view";
import { ButtonProps } from "@guest/views/guest.view";
import { Controller } from "@shared/controllers/controller";

export class ExtraServiceController extends Controller {
  constructor(
    private readonly view: ExtraServiceView,
    private readonly extraServiceService: ExtraServiceService
  ) {
    super();
  }

  public init() {
    return this.extraServiceService
      .get({ limit: 10, offset: 0 })
      .then((extraServices) => this.view.renderTable(extraServices));
  }

  public initInsertForm() {
    this.view.renderForm();
  }

  public initTableWithButtons() {
    this.extraServiceService
      .get({ limit: 10, offset: 0 })
      .then((extraServices) => {
        const tableWithButtonsProps = extraServices.map((extraService) => {
          const buttonProps: ButtonProps[] = [
            {
              label: "Edit",
              type: "button",
              onClickEvent: () => {
                this.view.renderForm(extraService);
              },
            },
            {
              label: "Delete",
              type: "button",
              onClickEvent: () => {
                this.extraServiceService.delete({ name: extraService.name });
              },
            },
          ];
          return {
            row: extraService,
            buttonProps,
          };
        });

        this.view.renderTableWithButtons(tableWithButtonsProps);
      });
  }

  public initSubmitButton() {
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.extraServiceService.create(inputs);
    });
  }
}
