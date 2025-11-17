import { Container } from "@shared/container/container";

const container = new Container({
  http: {
    url: "http://localhost:3000",
  },
  routes: [
    "guests",
    "rooms",
    "roomSizes",
    "reservations",
    "reservationDetails",
    "extraServices",
    "reservation"
  ],
});

const router = container.router;

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("hashchange", () => router.handle());
});
