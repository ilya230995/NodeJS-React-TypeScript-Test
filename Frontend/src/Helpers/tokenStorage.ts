export const tokenStorage = {
  getAccessToken: (): string | null => localStorage.getItem('AccessTokenTest'),
  setAccessToken: (token: string): void => localStorage.setItem('AccessTokenTest', token),
  removeAccessToken: (): void => localStorage.removeItem('AccessTokenTest'),
  getCart: (): string | null => localStorage.getItem('cart'),
  setCart: (token: string): void => localStorage.setItem('cart', token),
  removeCart: (): void => localStorage.removeItem('cart'),
};
