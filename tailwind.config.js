
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colours
        'brand-primary': '#0F766E',
        'brand-accent': '#14B8A6',

        // Surfaces
        'surface-page': '#F8FAFC',
        'surface-card': '#FFFFFF',

        // Text
        'text-primary': '#1E293B',
        'text-muted': '#64748B',

        // Task types
        feature: '#2563EB',
        bug: '#DC2626',

        // Due-date states
        'due-safe': '#16A34A',
        'due-warning': '#D97706',
        'due-overdue': '#DC2626',
        'due-neutral': '#94A3B8',
      },
    },
  },
  plugins: [],
};
