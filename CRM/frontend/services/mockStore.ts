
/* 
  DEPRECATED: mockStore.ts has been safely removed. 
  Transitioned to apiService.ts for real backend communication. 
*/
export const mockStore: any = null;
export const hashPassword = (p: string) => `nexus_v1_${btoa(p)}`;
