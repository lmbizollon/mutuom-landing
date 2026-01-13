-- ============================================
-- MUTUOM - Setup Supabase complet
-- ============================================
-- Projet: mutuom-prod
-- Région: Europe (Frankfurt)
-- Date: 2026-01-12
-- ============================================

-- ============================================
-- TABLE 1: AMBASSADEURS
-- ============================================

-- Créer la table
CREATE TABLE ambassadeurs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  entreprise VARCHAR(200) NOT NULL,
  volume_mensuel VARCHAR(50),
  email VARCHAR(255) UNIQUE NOT NULL,
  telephone VARCHAR(20),
  ville VARCHAR(100),
  message TEXT,
  statut VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_ambassadeurs_email ON ambassadeurs(email);
CREATE INDEX idx_ambassadeurs_created ON ambassadeurs(created_at DESC);

-- Activer RLS (Row Level Security)
ALTER TABLE ambassadeurs ENABLE ROW LEVEL SECURITY;

-- Policy: permettre l'insertion publique (depuis formulaire)
CREATE POLICY "Public insert ambassadeurs"
  ON ambassadeurs FOR INSERT
  WITH CHECK (true);

-- ============================================
-- TABLE 2: FOURNISSEURS
-- ============================================

-- Créer la table
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

-- Index pour performances
CREATE INDEX idx_fournisseurs_email ON fournisseurs(email);

-- Activer RLS (Row Level Security)
ALTER TABLE fournisseurs ENABLE ROW LEVEL SECURITY;

-- Policy: permettre l'insertion publique (depuis formulaire)
CREATE POLICY "Public insert fournisseurs"
  ON fournisseurs FOR INSERT
  WITH CHECK (true);

-- ============================================
-- FONCTION: Compteur ambassadeurs
-- ============================================

-- Fonction pour compter les ambassadeurs (excluant les rejetés)
CREATE OR REPLACE FUNCTION get_ambassador_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM ambassadeurs WHERE statut != 'rejected';
$$ LANGUAGE SQL STABLE;

-- ============================================
-- VÉRIFICATION (optionnel)
-- ============================================

-- Vérifier que les tables sont créées
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('ambassadeurs', 'fournisseurs');

-- Compter les enregistrements (devrait être 0 au début)
SELECT 'ambassadeurs' as table_name, COUNT(*) as count FROM ambassadeurs
UNION ALL
SELECT 'fournisseurs' as table_name, COUNT(*) as count FROM fournisseurs;

-- Tester la fonction compteur (devrait retourner 0)
SELECT get_ambassador_count() as ambassadeurs_valides;
