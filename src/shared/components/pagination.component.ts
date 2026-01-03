import { ButtonComponent } from "./button.component";

export interface PaginationComponentProps {
  next: () => void;
  previous: () => void;
  last: () => void;
  first: () => void;
}
export class PaginationComponent {
  constructor(private readonly button: ButtonComponent) {}
  render(props: PaginationComponentProps) {
    const container = document.createElement("div");
    container.className = "pagination";

    const nav = document.createElement("div");
    nav.className = "pagination-nav";

    const pageCounter = document.createElement("input");
    pageCounter.id = "page-counter";
    pageCounter.type = "number";
    pageCounter.value = "1";
    pageCounter.min = "1";

    const previewButton = this.button.render({
      label: "<",
      type: "button",
      onclickEvent: props.previous,
    });

    const nextButton = this.button.render({
      label: ">",
      type: "button",
      onclickEvent: props.next,
    });

    const firstButton = this.button.render({
      label: "<<",
      type: "button",
      onclickEvent: props.first,
    });

    const lastButton = this.button.render({
      label: ">>",
      type: "button",
      onclickEvent: props.last,
    });

    nav.appendChild(firstButton);
    nav.appendChild(previewButton);
    nav.appendChild(pageCounter);
    nav.append(nextButton);
    nav.appendChild(lastButton);
    container.appendChild(nav);

    const limitContainer = document.createElement("div");
    limitContainer.className = "paginatiom-limit";

    const textBefore = document.createElement("span");
    textBefore.textContent = "Show";

    const limitCounter = document.createElement("input");
    limitCounter.id = "limit";
    limitCounter.type = "number";
    limitCounter.min = "1";
    limitCounter.value = "15";

    const textAfter = document.createElement("span");
    textAfter.textContent = "per page";

    limitContainer.appendChild(textBefore);
    limitContainer.appendChild(limitCounter);
    limitContainer.appendChild(textAfter);

    container.appendChild(limitContainer);

    return container;
  }
}
