interface TableProps {
  row: Record<string, any>;
  buttons?: HTMLButtonElement[];
}

export class TableComponent {
  public render(tableProps: TableProps[]): HTMLTableElement {
    const table = document.createElement("table");
    table.className = "table";
    const headers = Object.keys(tableProps[0].row);
    const buttons = tableProps[0].buttons ?? [];
    for (const button of buttons) {
      headers.push(button.textContent ?? "");
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
      for (const button of tdButtons) {
        const tdButton = document.createElement("td");
        tdButton.appendChild(button);
        row.appendChild(tdButton);
      }

      table.appendChild(row);
    }
    return table;
  }
}
