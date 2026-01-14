export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MUTUOM',
    url: 'https://mutuom.com',
    logo: 'https://mutuom.com/logo.svg',
    description: 'Groupement d\'achat professionnel pour entreprises de nettoyage en Auvergne-Rhône-Alpes',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Auvergne-Rhône-Alpes',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      areaServed: 'FR',
      availableLanguage: 'French',
    },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Groupement d\'achat',
    provider: {
      '@type': 'Organization',
      name: 'MUTUOM',
    },
    areaServed: {
      '@type': 'State',
      name: 'Auvergne-Rhône-Alpes',
    },
    description: 'Groupement d\'achat pour entreprises de nettoyage. Économies de 15 à 25% sur les consommables professionnels.',
  }

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: 'Adhésion Ambassadeur MUTUOM',
    description: 'Les 15 premiers adhérents bénéficient d\'une adhésion gratuite à vie',
    price: '0',
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'MUTUOM',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(offerSchema),
        }}
      />
    </>
  )
}
