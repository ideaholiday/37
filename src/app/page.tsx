import { Hero } from '@/components/features/hero'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* Additional sections will be added here */}
      </main>
      <Footer />
    </div>
  )
}
