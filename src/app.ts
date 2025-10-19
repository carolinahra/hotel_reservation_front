import { Container } from "@shared/container/container";

const container = new Container({
  http: {
    url: "http://localhost:3000",
  },
});

const guestController = container.guestController;
const router = container.router;

document.addEventListener("DOMContentLoaded", () => {
  guestController.initTableWithButtons();
  guestController.initInsertForm();
  guestController.initSubmitButton();
  window.addEventListener('hashchange', () => router.handle());
});
