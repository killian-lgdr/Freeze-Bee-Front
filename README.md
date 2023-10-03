# Killer Bee ERP

Bienvenue dans l'application Killer Bee ERP, une solution de gestion d'entreprise basée sur Vue.js 3.

## Description

Cette application vous permet de gérer divers aspects de votre entreprise, notamment les processus, les produits, les ingrédients et les informations sur les utilisateurs. Elle est intégrée à Keycloak pour gérer l'authentification et l'autorisation des utilisateurs.

## Fonctionnalités

- Barre de navigation avec des liens vers différentes sections de l'application.
- Page d'accueil accueillante pour les utilisateurs.
- Intégration avec un backend API à l'URL [http://localhost:8080/](http://localhost:8080/).
- Intégration avec Keycloak pour l'authentification et l'autorisation.
- Gestion des processus, des produits et des ingrédients.
- Possibilité de se déconnecter.

## Configuration

Assurez-vous de configurer les variables d'environnement suivantes dans votre fichier `.env` :

- `VUE_APP_API_URL`: L'URL de votre backend API, par exemple : [http://localhost:8080/](http://localhost:8080/).
- `VUE_APP_KC_URL`: L'URL de votre serveur Keycloak, par exemple : [http://localhost:64261/](http://localhost:64261/).
- `VUE_APP_KC_REALM`: Le nom du realm Keycloak, par exemple : `quarkus`.
- `VUE_APP_KC_CLIENT_ID`: L'ID du client Keycloak, par exemple : `erp-front`.

## Installation

1. Clonez ce dépôt sur votre machine locale.

```bash
git clone https://votre-repo-git.com/killer-bee-erp.git
cd killer-bee-erp
