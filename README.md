# Waze Bénin

Une application communautaire de navigation et de signalement en temps réel adaptée aux réalités du Bénin.

## Objectif
Créer une alternative open source à Waze, adaptée au contexte béninois : signalements d’incidents, embouteillages, zémidjans, routes non goudronnées, etc.

## Fonctionnalités principales (MVP)
- Affichage de la carte (OpenStreetMap)
- Géolocalisation de l’utilisateur
- Signalement en temps réel d’incidents (accidents, bouchons, dangers…)
- Affichage des signalements sur la carte
- Interface simple et adaptée au Bénin

## Stack technique proposée
- **Frontend** : React, React Native ou Flutter
- **Cartographie** : OpenStreetMap, Leaflet.js (web) ou MapLibre (mobile)
- **Backend** : Node.js/Express, Firebase ou Supabase
- **Base de données temps réel** : Firebase, Supabase, ou WebSocket

## Structure du projet
- `/frontend` : application mobile ou web
- `/backend` : serveur, API, base de données
- `/docs` : documentation, cahier des charges

## Licence
Projet open source sous licence MIT.

---

## Pour contribuer
Voir le fichier [CONTRIBUTING.md](CONTRIBUTING.md)

## Roadmap
- [ ] Initialisation du projet
- [ ] Affichage de la carte
- [ ] Signalements en temps réel
- [ ] Tests utilisateurs
- [ ] Déploiement d’une démo
