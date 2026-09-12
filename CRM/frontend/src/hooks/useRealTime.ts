import { useEffect, useRef } from 'react';
import { webSocketService, EventCallback } from '../services/webSocketService';

/**
 * Custom hook to listen for real-time WebSocket events with automatic debouncing.
 * Prevents API flood when multiple events fire in rapid succession across 400+ active users.
 *
 * @param eventNames Event name or array of event names to listen for (e.g. 'ClientDataChanged', 'PaymentRecorded')
 * @param callback Callback function to execute when event is received
 * @param debounceMs Debounce threshold in milliseconds (default 400ms)
 */
export function useRealTime(
  eventNames: string | string[],
  callback: EventCallback,
  debounceMs: number = 400
) {
  const timerRef = useRef<any>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const events = Array.isArray(eventNames) ? eventNames : [eventNames];
    const unsubscribers: Array<() => void> = [];

    const debouncedHandler: EventCallback = (data) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackRef.current(data);
      }, debounceMs);
    };

    events.forEach((evt) => {
      const unsub = webSocketService.subscribe(evt, debouncedHandler);
      unsubscribers.push(unsub);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [eventNames, debounceMs]);
}
