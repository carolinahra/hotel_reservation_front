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
      guestId: 1,
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
