import { ButtonComponent } from "@shared/components/button.component";
import { FormComponent } from "@shared/components/form.component";

export class BookingView {
  constructor(
    private readonly form: FormComponent,
    private readonly button: ButtonComponent
  ) {}
  public renderBookingForm() {
    if (document.getElementById("booking-form")) {
      const element = document.getElementById("booking-form");
      this.clean(element);
    }
    const form = this.form.render([
      {
        fieldName: "Check-in",
        type: "date",
        id: "booking-checkin-field",
      },
      {
        fieldName: "Check-out",
        type: "date",
        id: "booking-checkout-field",
      },
    ]);
    form.id = "booking-form";
    const div = document.getElementById("app");
    div.appendChild(form);
  }

  public renderSubmitButton(event: () => void) {
    const button = this.button.render({
      label: "Submit",
      type: "submit",
      onclickEvent: event,
    });
    button.id = "create-booking-button";
    const div = document.getElementById("app");
    div.appendChild(button);
  }

  public readFromInputs() {
    const extraServiceInputs = document.querySelectorAll<HTMLInputElement>(
      "#extra-service-options input.extra-service-option:checked"
    );
    const extraServiceIds = Array.from(extraServiceInputs).map(
      (extraServiceInput) => Number(extraServiceInput.value)
    );
    const inputs = {
      guestId: 5,
      roomsId: [Number(sessionStorage.getItem("bookingRoomId"))],
      extraServiceIds,
      checkInDate: (
        document.getElementById("booking-checkin-field") as HTMLInputElement
      ).value,
      checkOutDate: (
        document.getElementById("booking-checkout-field") as HTMLInputElement
      ).value,
    };
    return inputs;
  }

  public bindPriceCalculation(callback: () => void): void {
    const checkIn = document.getElementById(
      "booking-checkin-field"
    ) as HTMLInputElement;
    const checkOut = document.getElementById(
      "booking-checkout-field"
    ) as HTMLInputElement;
    const extraServicesForm = document.getElementById(
      "extra-service-options"
    ) as HTMLFormElement;
    const tryRecalculate = () => {
      if (!checkIn?.value || !checkOut?.value) return;
      callback();
    };
    checkIn?.addEventListener("change", tryRecalculate);
    checkOut?.addEventListener("change", tryRecalculate);
    extraServicesForm?.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      const input = target.closest(
        "input.extra-service-option"
      ) as HTMLInputElement;
      if (input) {
        tryRecalculate();
      }
    });
  }

  public renderPrice(price: number) {
    let priceElement = document.getElementById("booking-price");
    if (!priceElement) {
      priceElement = document.createElement("div");
      priceElement.id = "booking-price";
      const form = document.getElementById("booking-form");
      form.appendChild(priceElement);
    }
    priceElement.textContent = `Total price: ${price}`;
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
