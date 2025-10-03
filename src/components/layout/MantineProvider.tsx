'use client';

import { MantineProvider as MantineProviderBase } from '@mantine/core';
import { mantineTheme } from '@/lib/mantine-theme';

interface MantineProviderProps {
  children: React.ReactNode;
}

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <MantineProviderBase theme={mantineTheme}>
      {children}
    </MantineProviderBase>
  );
}
