-- Table fournisseurs pour stocker les demandes de partenariat

CREATE TABLE fournisseurs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  entreprise VARCHAR(200) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  fonction VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  categorie_produits VARCHAR(100),
  volume_annuel VARCHAR(50),
  zone_livraison VARCHAR(100),
  message TEXT,
  statut VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
