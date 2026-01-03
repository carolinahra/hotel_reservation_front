import { Guest } from "@guest/models/guest";
import { GuestService } from "@guest/services/guest.service";
import {
  ButtonProps,
  Filter,
  GuestView,
  Pagination,
} from "@guest/views/guest.view";
import {
  PaginationComponent,
  PaginationComponentProps,
} from "@shared/components/pagination.component";
import { Controller } from "@shared/controllers/controller";

interface GetGuestProps {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  limit?: number;
  offset?: number;
  filter?: boolean;
}
export class GuestController extends Controller {
  private readonly submitNewGuestOnClick = () => {
    this.view.renderForm();
    this.view.renderSubmitButton(() => {
      const inputs = this.view.readFormInputs();
      this.guestService.create(inputs);
    });
  };
  private readonly filterByEmail = async () => {
    const paginationParams = this.view.readPaginationInputs();
    const offset = this.calculateOffset(1, paginationParams.limit);
    const email = this.view.readFromFilterInput();
    localStorage.setItem("pageCounter", "1");
    this.view.setPageCounter(1);

    this.reloadTable({
      limit: paginationParams.limit,
      offset,
      filter: true,
      email,
    });
  };
  private readonly filterByName = () => {
    const paginationParams = this.view.readPaginationInputs();
    const offset = this.calculateOffset(1, paginationParams.limit);
    const name = this.view.readFromFilterInput();
    localStorage.setItem("pageCounter", "1");
    this.view.setPageCounter(1);
    this.reloadTable({
      limit: paginationParams.limit,
      offset,
      filter: true,
      name,
    });
  };

  private readonly filters: Filter = {
    byEmail: this.filterByEmail,
    byName: this.filterByName,
  };

  private readonly first = () => {
    const paginationParams = this.view.readPaginationInputs();
    this.view.setPageCounter(1);
    this.reloadTable({
      limit: paginationParams.limit,
      offset: 0,
    });
  };
  private readonly last = async () => {};
  private readonly next = async () => {
    const paginationParams = this.view.readPaginationInputs();
    const newPage = paginationParams.pageCounter + 1;
    const offset = this.calculateOffset(newPage, paginationParams.limit);
    localStorage.setItem("pageCounter", newPage.toString());
    this.view.setPageCounter(newPage);

    this.reloadTable({
      limit: paginationParams.limit,
      offset,
    });
  };
  private readonly previous = () => {
    const paginationParams = this.view.readPaginationInputs();
    const newPage = Math.max(1, paginationParams.pageCounter - 1);
    const offset = this.calculateOffset(newPage, paginationParams.limit);
    localStorage.setItem("pageCounter", newPage.toString());
    this.view.setPageCounter(newPage);
    this.reloadTable({
      limit: paginationParams.limit,
      offset,
    });
  };

  private readonly paginationControls: PaginationComponentProps = {
    first: this.first,
    last: this.last,
    next: this.next,
    previous: this.previous,
  };

  private readonly limitCounterEvent = () => {
    const paginationParams = this.view.readPaginationInputs();
    const offset = this.calculateOffset(
      paginationParams.pageCounter,
      paginationParams.limit
    );
    this.reloadTable({ limit: paginationParams.limit, offset });
  };
  private readonly pageCounterEvent = () => {
    const paginationParams = this.view.readPaginationInputs();
    const offset = this.calculateOffset(
      paginationParams.pageCounter,
      paginationParams.limit
    );
    localStorage.setItem(
      "pageCounter",
      paginationParams.pageCounter.toString()
    );
    this.reloadTable({
      limit: paginationParams.limit,
      offset,
    });
  };

  private readonly pagination: Pagination = {
    limitCounterEvent: this.limitCounterEvent,
    pageCounterEvent: this.pageCounterEvent,
  };

  private readonly onLoadGuests = (guests: Guest[], offset: number) => {
    const tableProps = guests.map((guest) => {
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
                .then(() => {
                  const paginationParams = this.view.readPaginationInputs();

                  return this.reloadTable({
                    limit: paginationParams.limit,
                    offset,
                  });
                });
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

    this.view.renderTable(tableProps);
    this.view.renderTableFilter();
    this.view.bindFilterEventListeners(this.filters);
    this.view.renderPaginationControls(this.paginationControls);
    this.view.bindPaginationEventListeners(this.pagination);
  };
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
    this.view.renderCreateNewButton(this.submitNewGuestOnClick);
    if (!localStorage.getItem("pageCounter")) {
      localStorage.setItem("pageCounter", "1");
    }
    if (!localStorage.getItem("limit")) {
      localStorage.setItem("limit", "15");
    }
    const page = Number(localStorage.getItem("pageCounter"));
    const limit = Number(localStorage.getItem("limit"));
    this.view.setLimit(limit);
    const offset = this.calculateOffset(page, limit);
    this.guestService
      .get({ limit, offset })
      .then((guests) => this.onLoadGuests(guests, offset));
  }

  private reloadTable(props: GetGuestProps) {
    this.guestService.get(props).then((guests) => {
      const page = Number(localStorage.getItem("pageCounter") ?? "1");
      if (guests.length === 0 && page > 1) {
        localStorage.setItem("pageCounter", "1");
        this.view.setPageCounter(1);
        return this.reloadTable({
          limit: props.limit,
          offset: 0,
        });
      }
      const tablePops = guests.map((guest) => {
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
      const desiredRows = guests.length;

      this.view.removeRows(desiredRows);
      this.view.renderRows({ rowProps: tablePops, desiredRows });
      return this.view.reloadTable(tablePops);
    });
  }

  private calculateOffset(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return offset;
  }

  public clean() {
    this.view.clean();
  }
}

// TODO: FIltros. Hacer un desplegable para filtrar por nombre, correo, etc. En backend hacer nuevo get que permita filtrar (WHERE name LIKE props.name)
