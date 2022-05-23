export {};

declare global {
    interface Window {
        // В d.ts нам неважно что это за тип,
        // так как он сразу попадает в redux store на клиенте
        __INITIAL_STATE__?: object;
    }
}
