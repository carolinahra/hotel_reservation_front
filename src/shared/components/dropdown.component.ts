interface DropDownProps {
  selectName: string;
  selectID: string;
  optionsProps: OptionDropDownProps[];
  label: string;
}

interface OptionDropDownProps {
  value: string;
  textContent: string;
  id: string;
}

export class DropDownComponent {
  public render(props: DropDownProps) {
    const container = document.createElement("div");
    container.className = "dropdown-container";
    const label = document.createElement("label");
    label.textContent = props.label;
    container.appendChild(label);

    const select = document.createElement("select");
    select.name = props.selectName;
    select.id = props.selectID;

    for (const selectProp of props.optionsProps) {
      const option = document.createElement("option");
      option.value = selectProp.value;
      option.textContent = selectProp.textContent;
      option.id = selectProp.id;

      select.appendChild(option);
    }

    container.appendChild(select);
    return container;
  }
}
