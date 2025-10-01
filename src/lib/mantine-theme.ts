import { createTheme } from '@mantine/core';

export const mantineTheme = createTheme({
  colors: {
    balak: [
      '#f7fbe7', // 50
      '#eef8ca', // 100
      '#e0f29a', // 200
      '#d0eb66', // 300
      '#c4e646', // 400
      '#bfe23a', // 500 - main
      '#a6c92f', // 600
      '#86a827', // 700
      '#6a8422', // 800
      '#586b20', // 900
      '#2b3610', // 950
    ],
    charcoal: [
      '#f5f6f7', // 50
      '#e6e7ea', // 100
      '#cfd2d7', // 200
      '#a9aeb6', // 300
      '#7d848e', // 400
      '#5a6068', // 500
      '#3f444b', // 600
      '#2c3036', // 700
      '#1f2226', // 800
      '#16181b', // 900
      '#0f1012', // 950
    ],
  },
  primaryColor: 'balak',
  primaryShade: 5,
  defaultRadius: 'md',
  fontFamily: 'Public Sans, sans-serif',
  headings: {
    fontFamily: 'Public Sans, sans-serif',
  },
  components: {
    Carousel: {
      defaultProps: {
        withIndicators: true,
        withControls: true,
        slideSize: '33.333333%',
      },
      styles: {
        root: {
          width: '100%',
        },
        container: {
          gap: '1rem',
        },
        slide: {
          padding: '0 0.5rem',
          height: 'auto',
        },
        control: {
          backgroundColor: 'var(--mantine-color-charcoal-8)',
          border: '1px solid var(--mantine-color-charcoal-6)',
          color: 'var(--mantine-color-balak-3)',
          '&:hover': {
            backgroundColor: 'var(--mantine-color-charcoal-7)',
            color: 'var(--mantine-color-balak-2)',
          },
        },
        indicator: {
          backgroundColor: 'var(--mantine-color-charcoal-6)',
          '&[data-active]': {
            backgroundColor: 'var(--mantine-color-balak-5)',
          },
        },
      },
    },
  },
});
