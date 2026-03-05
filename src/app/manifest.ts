import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Parañaque Data Link',
    short_name: 'PQ DataLink',
    description: 'Professional Real Property Land Data Processor for Parañaque City.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#22c55e',
    icons: [
      {
        src: 'https://picsum.photos/seed/pwa-1/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: 'https://picsum.photos/seed/pwa-2/512/512',
        sizes: '512x512',
        type: 'image/png'
      },
    ],
  }
}
