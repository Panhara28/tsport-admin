export interface StatusOption {
  readonly value?: string;
  readonly label?: string;
  readonly color?: string;
  readonly isFixed?: boolean;
}

export const statusOptions: readonly StatusOption[] = [
  { value: 'PENDING', label: 'Pending', color: '#4886ff' },
  { value: 'INREVIEW', label: 'In review', color: '#fa7d03' },
  { value: 'REVERSION', label: 'Reversion', color: '#ff484c' },
  { value: 'PUBLISHED', label: 'Published', color: '#7ad835' },
];
