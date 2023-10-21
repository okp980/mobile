const DEV_BASE = 'http://localhost:4000';
const PROD_BASE = 'https://zuraaya-backend.up.railway.app';
const BASE = __DEV__ ? DEV_BASE : PROD_BASE;

export const baseURL = `${BASE}/api/v1`;
