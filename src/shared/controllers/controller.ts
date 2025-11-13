export abstract class Controller {
   abstract init(): Promise<void> | void;
}