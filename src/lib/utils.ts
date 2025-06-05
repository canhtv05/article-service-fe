import { clsx, type ClassValue } from 'clsx';
import { format, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyVND(amount: number): string {
  return amount.toLocaleString('vi-VN') + ' đ';
}

type DateFormatPattern = 'dd/MM/yyyy' | 'dd/MM/yyyy HH:mm:ss';

export const formatDateTime = (isoString: string, pattern: DateFormatPattern = 'dd/MM/yyyy HH:mm:ss') => {
  const date = parseISO(isoString);
  return format(date, pattern);
};
