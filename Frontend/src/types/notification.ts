export type TypeT = 'error' | 'warning' | 'info' | 'success';
export type VariantT = 'filled' | 'outlined' | 'standard';

export interface IOrientation {
  vertical: 'bottom' | 'top';
  horizontal: 'center' | 'left' | 'right';
}

export interface IStyles {
  type?: TypeT;
  variant?: VariantT;
  hideDuration?: number | null;
}
