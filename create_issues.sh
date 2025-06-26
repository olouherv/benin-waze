#!/bin/bash

# Script pour créer les premières issues sur GitHub avec GitHub CLI
# Remplacez par votre nom d'utilisateur GitHub
REPO="olouherv/benin-waze"

# 🟢 Tâches techniques de base
gh issue create --repo $REPO --title "Initialiser le projet frontend (React, React Native ou Flutter)" --body "Créer la structure de base du frontend avec le framework choisi."
gh issue create --repo $REPO --title "Afficher une page d’accueil simple" --body "Mettre en place une page d'accueil pour vérifier que le frontend fonctionne."
gh issue create --repo $REPO --title "Initialiser le projet backend (Node.js/Express, Firebase, etc.)" --body "Mettre en place le serveur backend avec une structure de base."
gh issue create --repo $REPO --title "Créer une première route API de test" --body "Créer une route API pour vérifier que le backend fonctionne."
gh issue create --repo $REPO --title "Afficher une carte OpenStreetMap centrée sur le Bénin" --body "Intégrer une carte OSM dans le frontend et la centrer sur le Bénin."
gh issue create --repo $REPO --title "Ajouter la géolocalisation utilisateur sur la carte" --body "Permettre à l'utilisateur de voir sa position sur la carte."
gh issue create --repo $REPO --title "Créer un formulaire de signalement d’incident" --body "Permettre à l'utilisateur de signaler un incident (type, description, position)."
gh issue create --repo $REPO --title "Enregistrer les signalements dans la base de données" --body "Stocker les signalements envoyés par les utilisateurs dans la base de données."
gh issue create --repo $REPO --title "Afficher les signalements en temps réel sur la carte" --body "Afficher les incidents signalés sur la carte pour tous les utilisateurs."

# 🟡 Tâches d’organisation et de documentation
gh issue create --repo $REPO --title "Compléter le README.md avec installation et usage" --body "Ajouter des instructions d'installation, d'utilisation et de contribution."
gh issue create --repo $REPO --title "Documenter le cahier des charges et les user stories" --body "Détailler les besoins, les cas d'usage et les profils utilisateurs."
gh issue create --repo $REPO --title "Mettre en place un fichier .env.example" --body "Lister les variables d'environnement nécessaires au projet."
gh issue create --repo $REPO --title "Créer un workflow de contribution (CONTRIBUTING.md)" --body "Expliquer comment contribuer efficacement au projet."

# 🟣 Tâches d’amélioration
gh issue create --repo $REPO --title "Créer une maquette (wireframe) des écrans principaux" --body "Schématiser les principaux écrans de l'application."
gh issue create --repo $REPO --title "Définir la structure de la base de données" --body "Spécifier les champs pour les signalements, utilisateurs, etc."
gh issue create --repo $REPO --title "Ajouter un premier test unitaire côté backend et frontend" --body "Mettre en place des tests de base pour garantir la qualité du code."

echo "Toutes les issues ont été créées sur $REPO !"
