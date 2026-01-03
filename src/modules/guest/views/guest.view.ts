import { Guest } from "@guest/models/guest";
import { ButtonComponent } from "@shared/components/button.component";
import { DropDownComponent } from "@shared/components/dropdown.component";
import { FormComponent } from "@shared/components/form.component";
import {
  PaginationComponent,
  PaginationComponentProps,
} from "@shared/components/pagination.component";
import { TableComponent } from "@shared/components/table.component";

export interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onClickEvent: () => any;
}
interface RowProps {
  row: Guest;
  buttonProps: ButtonProps[];
}
interface RenderRowsProps {
  desiredRows: number;
  rowProps: RowProps[];
}

export interface Pagination {
  pageCounterEvent: () => any;
  limitCounterEvent: () => any;
}

export interface Filter {
  byName: () => any;
  byEmail: () => any;
}
export class GuestView {
  div: HTMLDivElement;
  constructor(
    private readonly table: TableComponent,
    private readonly form: FormComponent,
    private readonly button: ButtonComponent,
    private readonly pagination: PaginationComponent,
    private readonly dropdown: DropDownComponent
  ) {
    this.div = document.getElementById("app") as HTMLInputElement;
  }

  public renderTable(props: RowProps[]): void {
    if (document.getElementById("guest-table")) {
      this.clean(document.getElementById("guest-table"));
    }
    const tableRowProps = this.toTableRows(props);
    const table = this.table.renderRows({
      rowsProps: tableRowProps,
    });
    table.id = "guest-table";
    const div = document.getElementById("app");
    div.appendChild(table);
    this.table.load({
      rowsProps: tableRowProps,
      tableID: table.id,
    });
  }

  public renderForm(guest?: Guest): void {
    if (document.getElementById("guest-form")) {
      const element = document.getElementById("guest-form");
      this.clean(element);
    }
    const form = this.form.render([
      {
        fieldName: "Name",
        type: "string",
        id: "guest-name-field",
        value: guest?.name ?? "",
      },
      {
        fieldName: "Email",
        type: "email",
        id: "guest-email-field",
        value: guest?.email ?? "",
      },
      {
        fieldName: "Phone",
        type: "tel",
        id: "guest-phone-field",
        value: guest?.phone ?? "",
      },
    ]);
    form.id = "guest-form";
    const div = document.getElementById("app");
    div.appendChild(form);
  }

  public renderSubmitButton(event: () => void): void {
    const button = this.button.render({
      label: "Submit",
      type: "submit",
      onclickEvent: event,
    });
    document.getElementById("guest-form").appendChild(button);
  }

  public renderCreateNewButton(event: () => void): void {
    if (document.getElementById("create-guest-button")) {
      this.clean(document.getElementById("create-guest-button"));
    }
    const button = this.button.render({
      label: "Create New Guest",
      type: "button",
      onclickEvent: event,
    });
    button.id = "create-guest-button";

    document.getElementById("app").appendChild(button);
  }

  public readFormInputs(): { name: string; email: string; phone: string } {
    const inputs = {
      name: (document.getElementById("guest-name-field") as HTMLInputElement)
        .value,
      email: (document.getElementById("guest-email-field") as HTMLInputElement)
        .value,
      phone: (document.getElementById("guest-phone-field") as HTMLInputElement)
        .value,
    };

    return inputs;
  }

  public renderPaginationControls(
    paginationProps: PaginationComponentProps
  ): void {
    const paginationControls = this.pagination.render(paginationProps);
    this.div.appendChild(paginationControls);
  }

  public bindPaginationEventListeners(callbacks: Pagination): void {
    const pageCounter = document.getElementById("page-counter");
    pageCounter.addEventListener("change", callbacks.pageCounterEvent);

    const limitCounter = document.getElementById("limit");
    limitCounter.addEventListener("change", callbacks.limitCounterEvent);
  }

  public readPaginationInputs() {
    const limitInput = document.getElementById("limit") as HTMLInputElement;
    let limit = Number(limitInput.value);
    const pageCounterInput = document.getElementById(
      "page-counter"
    ) as HTMLInputElement;
    let pageCounter = Number(pageCounterInput.value);
    if (pageCounter < 1) {
      pageCounter = 1;
      pageCounterInput.value = "1";
    }

    if (limit < 1) {
      limit = 1;
      limitInput.value = "1";
    }
    return {
      limit,
      pageCounter,
    };
  }

  public reloadTable(props: RowProps[]): void {
    const tableID = "guest-table";
    if (!props.length) {
      this.removeRows(0);
      return;
    }
    const rowsProps = this.toTableRows(props);
    this.table.load({
      rowsProps,
      tableID,
    });
  }

  public removeRows(desiredRows: number) {
    const tableID = "guest-table";

    return this.table.removeExtraRows({ desiredRows, tableID });
  }

  public renderRows(props: RenderRowsProps) {
    const tableID = "guest-table";
    const rowsProps = this.toTableRows(props.rowProps);
    return this.table.renderRows({
      rowsProps,
      tableID,
      desiredRows: props.desiredRows,
    });
  }

  public setPageCounter(value: number): void {
    const input = document.getElementById("page-counter") as HTMLInputElement;
    if (input) {
      input.value = value.toString();
    }
  }

  public setLimit(value: number): void {
    const input = document.getElementById("limit") as HTMLInputElement;
    if (input) {
      input.value = value.toString();
    }
  }

  public clean(element?: HTMLElement): void {
    const div = document.getElementById("app");
    if (element) {
      div.removeChild(element);
      return;
    }
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }
  private toTableRows(props: RowProps[]) {
    return props.map((prop) => {
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
  }
  renderTableFilter() {
    const optionsProps = [
      { value: "name", textContent: "Name", id: "filter-by-name-option" },
      { value: "email", textContent: "Email", id: "filter-by-email-option" },
    ];
    const props = {
      selectName: "filter",
      selectID: "guest-filter-table-select",
      optionsProps,
      label: "Choose one option",
    };
    const filterSelect = this.dropdown.render(props);
    const input = document.createElement("input");
    input.type = "text";
    input.id = "guest-filter-input";
    filterSelect.appendChild(input);

    const submitButton = this.button.render({
      label: "Submit",
      type: "button",
    });
    filterSelect.appendChild(submitButton);
    this.div.appendChild(filterSelect);
  }

  readFromFilterInput(): string {
    const filterInput = (
      document.getElementById("guest-filter-input") as HTMLInputElement
    ).value;
    return filterInput;
  }

  bindFilterEventListeners(callbacks: Filter) {
    const filterSelect = document.getElementById(
      "guest-filter-table-select"
    ) as HTMLSelectElement;
    const input = document.getElementById(
      "guest-filter-input"
    ) as HTMLInputElement;
    const filter = () => {
      const value = filterSelect.value;
      if (value === "name") {
        callbacks.byName();
      }
      if (value === "email") {
        callbacks.byEmail();
      }
    };
    filterSelect.addEventListener("change", filter);
    input.addEventListener("change", filter);
  }
}
