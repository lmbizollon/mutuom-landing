'use client'

import { Button } from '@/components/Button'
import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Solution } from '@/components/sections/Solution'
import { Combat } from '@/components/sections/Combat'
import { Values } from '@/components/sections/Values'
import { Simulator } from '@/components/sections/Simulator'
import { Transparency } from '@/components/sections/Transparency'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function Home() {
  const scrollToForm = () => {
    const formElement = document.getElementById('formulaire-ambassadeur')
    formElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen">
      <Hero onCTAClick={scrollToForm} />
      <Problem />
      <Solution />
      <Combat />
      <Values />
      <Simulator onCTAClick={scrollToForm} />
      <Transparency />
      <FinalCTA />
    </main>
  )
}
