export {};

declare global {
  interface GlobalEventHandlersEventMap {
    scrollend: Event;
  }
}