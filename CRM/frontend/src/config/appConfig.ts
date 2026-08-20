
export const USE_DEMO_AUTH = false;
export const API_BASE_URL = 'http://localhost:8000/api';
export const APP_NAME = 'NexusCRM';

// Centralized Persistence Config
export const CRM_STORAGE_KEY = 'crm_nexus_v7';
export const CRM_SCHEMA_VERSION = '1.2.0-STABLE';

// WebSocket Configuration
export const WS_ENABLED = true;
export const WS_HOST = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1';
export const WS_PORT = 6001;
export const WS_APP_KEY = 'nexus_crm_ws_key';
export const WS_SCHEME: 'ws' | 'wss' = 'ws';

