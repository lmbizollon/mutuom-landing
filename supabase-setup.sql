-- INSTRUCTIONS POUR CONFIGURATION SUPABASE
-- 1. Créer un nouveau projet sur https://supabase.com
-- 2. Aller dans SQL Editor
-- 3. Copier-coller ce script et l'exécuter

-- ============================================
-- TABLE ambassadeurs
-- ============================================

CREATE TABLE IF NOT EXISTS ambassadeurs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  entreprise VARCHAR(200) NOT NULL,
  volume_mensuel VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telephone VARCHAR(20) NOT NULL,
  ville VARCHAR(100) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  statut VARCHAR(20) DEFAULT 'pending'
);

-- Index pour performances
CREATE INDEX IF NOT EXISTS idx_ambassadeurs_email ON ambassadeurs(email);
CREATE INDEX IF NOT EXISTS idx_ambassadeurs_created ON ambassadeurs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ambassadeurs_statut ON ambassadeurs(statut);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS
ALTER TABLE ambassadeurs ENABLE ROW LEVEL SECURITY;

-- Policy : Insertion publique (pour le formulaire)
CREATE POLICY "Public insert ambassadeurs"
ON ambassadeurs FOR INSERT
WITH CHECK (true);

-- Policy : Lecture admin uniquement (pour le dashboard futur)
-- Vous devrez ajuster cette policy selon votre système d'authentification admin
CREATE POLICY "Admin read ambassadeurs"
ON ambassadeurs FOR SELECT
USING (auth.role() = 'authenticated');

-- ============================================
-- FONCTION : Compter les places restantes
-- ============================================

CREATE OR REPLACE FUNCTION get_remaining_spots()
RETURNS INTEGER
LANGUAGE SQL
STABLE
AS $$
  SELECT (50 - COUNT(*)::INTEGER)
  FROM ambassadeurs
  WHERE statut != 'rejected';
$$;

-- ============================================
-- COMMENTAIRES
-- ============================================

COMMENT ON TABLE ambassadeurs IS 'Table des ambassadeurs MUTUOM - 50 premiers gratuits';
COMMENT ON COLUMN ambassadeurs.statut IS 'pending, approved, rejected';
COMMENT ON FUNCTION get_remaining_spots IS 'Retourne le nombre de places ambassadeur restantes sur 50';

-- ============================================
-- TEST (optionnel)
-- ============================================

-- Vérifier que la table est créée
SELECT * FROM ambassadeurs LIMIT 1;

-- Tester la fonction
SELECT get_remaining_spots();

-- ============================================
-- APRÈS AVOIR EXÉCUTÉ CE SCRIPT :
-- ============================================
-- 1. Aller dans Settings → API
-- 2. Copier :
--    - Project URL → NEXT_PUBLIC_SUPABASE_URL
--    - anon/public key → NEXT_PUBLIC_SUPABASE_ANON_KEY
-- 3. Coller dans /mutuom-landing/.env.local
