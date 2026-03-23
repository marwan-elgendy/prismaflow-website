'use client'
import dynamic from 'next/dynamic'

const NeuralBackground = dynamic(
  () => import('./NeuralBackground'),
  { ssr: false }
)

export default function NeuralBackgroundClient() {
  return <NeuralBackground />
}
