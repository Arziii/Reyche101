import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DataLink Parañaque',
    short_name: 'DataLink PQ',
    description: 'Professional Real Property Land Data Processor for Parañaque City.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f9fafb',
    theme_color: '#22c55e',
    icons: [
      {
        src: "/favicon.ico",
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'any'
      },
    ],
  }
}
