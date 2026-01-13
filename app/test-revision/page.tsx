"use client";

import { RevisionSheet } from "@/components/dashboard/RevisionSheet";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const sampleContent = `# 📊 Comptabilité Générale : Le Bilan

## 🎯 Objectif du cours
Comprendre la **structure du bilan** et la différence entre **Actif** et **Passif**.

---

## 📋 Le Bilan : Définition

Le **bilan** est un document comptable qui représente la **situation patrimoniale** de l'entreprise à un instant T.

Il se compose de deux parties :
- **L'Actif** : Ce que l'entreprise possède (emploi des ressources)
- **Le Passif** : Ce que l'entreprise doit (origine des ressources)

> 💡 **Règle d'or** : Actif = Passif (équilibre comptable)

---

## 🔄 Actif vs Passif : Le Tableau Comparatif

| **Actif** | **Passif** |
|-----------|------------|
| Emploi des ressources | Origine des ressources |
| Ce que l'entreprise **possède** | Ce que l'entreprise **doit** |
| Immobilisations (machines, locaux) | Capitaux propres |
| Stocks | Dettes fournisseurs |
| Créances clients | Emprunts bancaires |
| Trésorerie (compte en banque) | Dettes fiscales |

---

## 📊 Structure de l'Actif

L'actif est divisé en **deux grandes catégories** :

### 1. **Actif Immobilisé** (long terme)
- Immobilisations corporelles (bâtiments, machines)
- Immobilisations incorporelles (brevets, logiciels)
- Immobilisations financières (titres de participation)

### 2. **Actif Circulant** (court terme)
- Stocks de marchandises
- Créances clients
- Disponibilités (cash, banque)

---

## 💰 Structure du Passif

Le passif est également divisé en **deux grandes catégories** :

### 1. **Capitaux Propres** (ressources internes)
- Capital social
- Réserves
- Résultat de l'exercice

### 2. **Dettes** (ressources externes)
- Emprunts bancaires
- Dettes fournisseurs
- Dettes fiscales et sociales

---

## ✅ Points Clés à Retenir

1. **L'Actif** = Ce que l'entreprise **possède** (emploi)
2. **Le Passif** = Ce que l'entreprise **doit** (origine)
3. **Équation fondamentale** : \`Actif = Passif\`
4. **Actif Immobilisé** → Long terme (biens durables)
5. **Actif Circulant** → Court terme (liquidité)
6. **Capitaux Propres** → Ressources *internes* de l'entreprise
7. **Dettes** → Ressources *externes* (fournisseurs, banques)

---

## 🎓 Exemple Pratique : Bilan simplifié d'une PME

| **Actif** | Montant | **Passif** | Montant |
|-----------|---------|------------|---------|
| Immobilisations | 50 000 € | Capital social | 40 000 € |
| Stocks | 15 000 € | Réserves | 10 000 € |
| Créances clients | 10 000 € | Emprunt bancaire | 20 000 € |
| Trésorerie | 5 000 € | Dettes fournisseurs | 10 000 € |
| **TOTAL ACTIF** | **80 000 €** | **TOTAL PASSIF** | **80 000 €** |

✅ **L'équilibre est respecté !**

---

## 📝 Questions d'Examen Probables

1. Quelle est la différence entre l'Actif et le Passif ?
2. Citez 3 exemples d'Actif Immobilisé.
3. Qu'est-ce que les Capitaux Propres ?
4. Pourquoi le bilan doit-il toujours être équilibré ?
5. Classez les éléments suivants : Stock, Emprunt, Bâtiment, Créance.

---

## 🚀 Pour Aller Plus Loin

- **Lien avec le Compte de Résultat** : Le résultat (bénéfice ou perte) impacte les Capitaux Propres au Passif.
- **Analyse Financière** : Le bilan permet de calculer des ratios clés (solvabilité, liquidité).
- **Exercice** : Essaye de créer le bilan d'une entreprise fictive avec 5 postes à l'Actif et 5 au Passif.

---

*📚 Fiche générée par MemoFlow - N'écris plus jamais tes cours.*
`;

export default function TestRevisionPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au Dashboard
          </Link>
          <h1 className="mb-2 font-[var(--font-space-grotesk)] text-4xl font-bold text-white">
            Test de la Fiche de Révision
          </h1>
          <p className="text-zinc-400">
            Aperçu du composant RevisionSheet avec un exemple de cours de comptabilité.
          </p>
        </div>

        {/* Revision Sheet Component */}
        <RevisionSheet content={sampleContent} />
      </div>
    </div>
  );
}

