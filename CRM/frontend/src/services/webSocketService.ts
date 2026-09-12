import { WS_ENABLED, WS_HOST, WS_PORT, WS_SCHEME, WS_APP_KEY } from '../config/appConfig';

export type EventCallback = (data: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private isConnecting: boolean = false;
  private reconnectTimer: any = null;
  private isConnected: boolean = false;

  constructor() {
    if (WS_ENABLED && typeof window !== 'undefined') {
      this.connect();
    }
  }

  public connect(): void {
    if (this.socket || this.isConnecting || !WS_ENABLED) return;

    this.isConnecting = true;
    const protocol = (WS_SCHEME as string) === 'wss' ? 'wss' : 'ws';
    const wsUrl = `${protocol}://${WS_HOST}:${WS_PORT}/app/${WS_APP_KEY}`;

    try {
      this.socket = new WebSocket(wsUrl);

      this.socket.onopen = () => {
        this.isConnected = true;
        this.isConnecting = false;
        console.log('[WebSocket] Connection established successfully.');
        if (this.reconnectTimer) {
          clearTimeout(this.reconnectTimer);
          this.reconnectTimer = null;
        }
      };

      this.socket.onmessage = (event: MessageEvent) => {
        try {
          const payload = JSON.parse(event.data);
          const eventName = payload.event || payload.event_name;
          const data = payload.data || payload;

          if (eventName) {
            this.emit(eventName, data);
          }
        } catch (e) {
          // Ignore invalid payload format
        }
      };

      this.socket.onerror = () => {
        // Silent catch: prevent unhandled exception
        this.isConnecting = false;
      };

      this.socket.onclose = () => {
        this.isConnected = false;
        this.isConnecting = false;
        this.socket = null;
        // Schedule silent reconnect attempt after 10 seconds
        if (!this.reconnectTimer) {
          this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
          }, 10000);
        }
      };
    } catch (err) {
      this.isConnecting = false;
      this.socket = null;
      // Connection failed silently; standard REST polling/refetch will handle updates safely
    }
  }

  /**
   * Subscribe to a real-time event name (e.g. 'ClientDataChanged', 'PaymentRecorded', 'ActivityLoggedEvent')
   */
  public subscribe(eventName: string, callback: EventCallback): () => void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }

    const callbacks = this.listeners.get(eventName)!;
    callbacks.add(callback);

    // Return unsubscribe cleanup function
    return () => {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.listeners.delete(eventName);
      }
    };
  }

  /**
   * Emit event internally to subscribers (supports cross-component & local notification)
   */
  public emit(eventName: string, data: any): void {
    const callbacks = this.listeners.get(eventName);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[WebSocket] Error in subscriber for ${eventName}:`, err);
        }
      });
    }
  }

  /**
   * Helper to trigger real-time notification across tabs/components
   */
  public notifyEvent(eventName: string, data: any): void {
    this.emit(eventName, data);

    // Send via socket if connected
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        this.socket.send(JSON.stringify({ event: eventName, data }));
      } catch (e) {
        // Fallback silently
      }
    }
  }

  public getStatus(): boolean {
    return this.isConnected;
  }
}

export const webSocketService = new WebSocketService();
