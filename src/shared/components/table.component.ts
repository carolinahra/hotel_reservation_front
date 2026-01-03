interface TableRowProps {
  row: Record<string, any>;
  buttons?: HTMLButtonElement[];
}

interface TableProps {
  rowsProps: TableRowProps[];
  tableID?: string;
  desiredRows?: number;
}

interface RemoveRowsProps {
  tableID: string;
  desiredRows: number;
}

interface RenderTdsProps {
  tableProps: TableProps;
  row: HTMLTableRowElement;
}

export class TableComponent {
  public render(tableProps: TableRowProps[]): HTMLTableElement {
    const table = document.createElement("table");
    table.className = "table";
    const headers = Object.keys(tableProps[0].row);
    const buttons = tableProps[0].buttons ?? [];
    if (buttons.length > 0) {
      for (const button of buttons) {
        headers.push(button.textContent ?? "");
      }
    }

    const firstRow = document.createElement("tr");
    headers.map((element) => {
      return (firstRow.appendChild(document.createElement("th")).textContent =
        element);
    });

    table.appendChild(firstRow);

    for (const tableProp of tableProps) {
      const row = document.createElement("tr");
      const tableContent = Object.values(tableProp.row);

      for (const content of tableContent) {
        const td = document.createElement("td");
        td.textContent = content == null ? "" : String(content);
        row.appendChild(td);
      }

      const tdButtons = tableProp.buttons;
      if (tdButtons) {
        for (const button of tdButtons) {
          const tdButton = document.createElement("td");
          tdButton.appendChild(button);
          row.appendChild(tdButton);
        }
      }

      table.appendChild(row);
    }
    return table;
  }

  public renderRows(props: TableProps) {
    const isNewTable = !props.tableID;
    const table = props.tableID
      ? document.getElementById(props.tableID)
      : document.createElement("table");

    if (isNewTable) {
      table.className = "table";
      if (!props.rowsProps.length) {
        return table;
      }
      const headers = this.renderHeaders(props);
      table.appendChild(headers);
      for (let i = 0; i < props.rowsProps.length; i++) {
        const row = document.createElement("tr");
        row.className = "row";
        this.renderCells({
          row,
          tableProps: props,
        });
        table.appendChild(row);
      }

      return table;
    }

    if (props.desiredRows) {
      while (table.querySelectorAll("tr.row").length < props.desiredRows) {
        const row = document.createElement("tr");
        row.className = "row";
        this.renderCells({
          row,
          tableProps: props,
        });
        table.appendChild(row);
      }
      return table;
    }
  }

  public load(props: TableProps) {
    const table = document.getElementById(props.tableID);
    if (!table) {
      return;
    }
    const rows = table.querySelectorAll("tr.row");

    props.rowsProps.forEach((rowProp, index) => {
      const rowElement = rows[index];
      const cells = rowElement.querySelectorAll("td");
      const values = Object.values(rowProp.row);

      values.forEach((value, index) => {
        cells[index].textContent = value;
      });

      if (rowProp.buttons) {
        rowProp.buttons.forEach((button, index) => {
          const cellIndex = values.length + index;
          const cell = cells[cellIndex];
          if (!cell) {
            return;
          }
          cell.innerHTML = "";
          cell.appendChild(button);
        });
      }
    });
  }

  public removeExtraRows(props: RemoveRowsProps) {
    const table = document.getElementById(props.tableID);
    if (!table) {
      return;
    }
    const rows = Array.from(table.querySelectorAll("tr.row"));

    while (rows.length > props.desiredRows) {
      rows.pop()?.remove();
    }
  }

  private renderHeaders(props: TableProps) {
    const firstRow = document.createElement("tr");
    firstRow.className = "headers";
    const headers = Object.keys(props.rowsProps[0].row);
    const buttons = props.rowsProps[0].buttons ?? [];
    if (buttons.length > 0) {
      for (const button of buttons) {
        headers.push(button.textContent ?? "");
      }
    }
    headers.map((element) => {
      return (firstRow.appendChild(document.createElement("th")).textContent =
        element);
    });
    return firstRow;
  }

  private renderCells(props: RenderTdsProps): void {
    const values = Object.values(props.tableProps.rowsProps[0].row);

    for (const value of values) {
      const cell = document.createElement("td");
      props.row.appendChild(cell);
    }
    if (props.tableProps.rowsProps[0].buttons) {
      for (const button of props.tableProps.rowsProps[0].buttons) {
        const cell = document.createElement("td");
        props.row.appendChild(cell);
      }
    }
  }
}