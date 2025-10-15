interface TableProps {
  row: Record<string, any>;
  button?: HTMLButtonElement;
}

export class TableComponent {

  public render(tableProps: TableProps[]): HTMLTableElement {
    const table = document.createElement("table");
    table.className = "table";
    const headers = Object.keys(tableProps[0].row);
    tableProps[0].button == null
      ? ""
      : headers.push(tableProps[0].button.textContent);
    const firstRow = document.createElement("tr");
    headers.map((element) => {
      return (firstRow.appendChild(document.createElement("th")).textContent =
        element);
    });
    table.appendChild(firstRow);

    tableProps.map((tableProp) => {
      const row = document.createElement("tr");
      const tableContent = Object.values(tableProp.row);

      for (const content of tableContent) {
        const td = document.createElement("td");
        td.textContent = content == null ? "" : String(content);
        row.appendChild(td);
      }
      const tdButton = document.createElement("td");
      tdButton.appendChild(tableProp.button);
      row.appendChild(tdButton);

      return table.appendChild(row);
    });
    return table;
  }
}
