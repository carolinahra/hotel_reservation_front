interface ButtonProps {
  label: string;
  type: "button" | "submit" | "reset";
  onclickEvent?: () => any;
}

export class ButtonComponent {
  constructor() {}

  public render(buttonProps: ButtonProps) {
    const button = document.createElement("button");
    button.textContent = buttonProps.label;
    button.type = buttonProps.type;
    button.addEventListener("click", buttonProps.onclickEvent);
    return button;
  }
}
