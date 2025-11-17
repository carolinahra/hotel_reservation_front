import { ExtraService } from "@extra-service/models/extra-service";
import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}

interface TableWithButtonProps {
  row: ExtraService;
  buttonProps: ButtonProps[];
}
export class ExtraServiceView {
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}

  public renderTable(extraServices: ExtraService[]) {
    const tableProps = extraServices.map((extraService) => {
      return {
        row: extraService,
      };
    });
    const table = this.table.render(tableProps);
    document.getElementById("extra-service-table").appendChild(table);
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
    const docTable = document.getElementById(
      "extra-service-table-with-buttons"
    );
    while (docTable.firstChild) {
      docTable.removeChild(docTable.firstChild);
    }
    docTable.appendChild(table);
  }

  public renderExtraServiceOptions(
    extraServices: ExtraService[],
    formId: string
  ) {
    if (document.getElementById("extra-service-options")) {
      const element = document.getElementById("extra-service-options");
      this.clean(element);
    }

    const formProps = extraServices.map((extraService) => {
      return {
        fieldName: extraService.name,
        type: "checkbox",
        id: `extra-service-${extraService.id}-field`,
        value: extraService.id.toString(),
        class: "extra-service-option",
      };
    });
    const form = this.form.render(formProps);
    form.id = "extra-service-options";
    const div = document.getElementById(formId);
    div.appendChild(form);
  }

  public renderForm(extraService?: ExtraService) {
    const form = this.form.render([
      {
        fieldName: "Name",
        type: "string",
        id: "extra-service-name-field",
        value: extraService?.name ?? "",
      },
      {
        fieldName: "Price",
        type: "number",
        id: "extra-service-price-field",
        value: extraService?.price != null ? String(extraService.price) : "",
      },
    ]);
    const docForm = document.getElementById("extra-service-form-container");
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
    document
      .getElementById("extra-service-form-submit-button")
      .appendChild(button);
  }

  public readFormInputs() {
    const inputs = {
      name: (
        document.getElementById("extra-service-name-field") as HTMLInputElement
      ).value,
      price: Number(
        (
          document.getElementById(
            "extra-service-price-field"
          ) as HTMLInputElement
        ).value
      ),
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
