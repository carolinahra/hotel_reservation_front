import { HTTPService } from "./http.service";

interface BookingProps {
  guestId: number;
  roomsId: number[];
  extraServiceIds?: number[];
  checkInDate: string;
  checkOutDate: string;
}

export class BookingService {
  constructor(private readonly httpService: HTTPService) {}

  public handle(bookingProps: BookingProps) {
    const extraServices = bookingProps.extraServiceIds.map(
      (extraServiceId) => {
        return {
          roomId: bookingProps.roomsId[0],
          extraServiceId: extraServiceId,
        };
      }
    );

    const bodyContent = {
      guestId: bookingProps.guestId,
      roomsId: bookingProps.roomsId,
      extraServices,
      checkInDate: bookingProps.checkInDate,
      checkOutDate: bookingProps.checkOutDate,
    };

    return this.httpService.post("booking", bodyContent);
  }
}
