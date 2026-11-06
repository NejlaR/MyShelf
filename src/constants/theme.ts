import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#283C30',
    muted: '#666666',
    background: '#F7F3EC',
    card: '#FFFFFF',
    border: '#D8DED4',
    primary: '#374B3E',
    onPrimary: '#FFFFFF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#E4EBDD',
    textSecondary: '#526B50',
  },
  dark: {
    text: '#EDF3ED',
    muted: '#B4C0B7',
    background: '#151E1A',
    card: '#223029',
    border: '#405147',
    primary: '#A5D6AD',
    onPrimary: '#15251A',
    backgroundElement: '#223029',
    backgroundSelected: '#344B3C',
    textSecondary: '#B4C0B7',
  },
} as const;

export type Theme = (typeof Colors)['light'] | (typeof Colors)['dark'];

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const FontSize = {
  small: 13,
  body: 16,
  title: 20,
  hero: 28,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  pill: 999,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset =
  Platform.select({ ios: 50, android: 80 }) ?? 0;

export const MaxContentWidth = 800;