interface FormProps {
  fieldName: string;
  type: string;
  id: string;
  value?: string;
}

export class FormComponent {
  constructor() {}

  public render(inputFields: FormProps[]): HTMLFormElement {
    const form = document.createElement("form");
    for (const inputField of inputFields) {
      const label = document.createElement("label");
      label.textContent = inputField.fieldName;
      label.htmlFor = inputField.id;

      const input = document.createElement("input");
      input.name = inputField.fieldName;
      input.type = inputField.type;
      input.value = inputField.value != null ? inputField.value : "";
      input.id = inputField.id;

      const div = document.createElement("div");
      div.appendChild(label);
      div.appendChild(input);
      form.appendChild(div);
    }

    return form;
  }
}
