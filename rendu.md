# Realtime Elo Ranker - Développement Avancé

## Auteurs

- **Nom** : DEBRAY
- **Prénom** : Antoine
- **Groupe** : 1
- **Identifiant GitHub** : [AntoineDebray1](https://github.com/AntoineDebray1/realtime-elo-ranker)

## Introduction

Le projet **Realtime Elo Ranker** a pour objectif de créer une application web permettant de simuler des matchs entre des joueurs et de calculer et afficher leur classement Elo en temps réel. Ce classement est utilisé dans des jeux à deux joueurs et est mis à jour après chaque match selon un calcul probabilistique.


## Ma Contribution  

J'ai travaillé exclusivement sur la **partie serveur** du projet, en structurant le backend de manière modulaire pour gérer :  

- **Les joueurs** : Création et gestion des entités Player.  
- **Les matchs** : Gestion des confrontations entre joueurs.  
- **Le classement Elo** : Calcul et mise à jour du classement après chaque match.  
- **L'EventEmitter** : Mise en place d'un système d'événements pour notifier les mises à jour.  
- **La base de données** : Définition des entités et relations nécessaires.  

## Structure du Backend  

Le backend est organisé en plusieurs modules, chacun dédié à une fonctionnalité spécifique :  

### `entities/`  
- **match.entity.ts** → Définition de l'entité Match pour la base de données.  
- **player.entity.ts** → Définition de l'entité Player.  

### `event-emitter/`  
- **event-emitter.module.ts** → Module centralisant les événements du backend.  
- **event-emitter.service.ts** → Service pour émettre et écouter les événements liés aux matchs et classements.  

### `Matches/`  
- **match.controller.ts** → Routes pour gérer les matchs.  
- **match.service.ts** → Logique métier pour la gestion des matchs et calcul du classement.  
- **matches.module.ts** → Regroupe le contrôleur et le service dans un module dédié.  

### `Player/`  
- **player.controller.ts** → Routes pour créer et gérer les joueurs.  
- **player.service.ts** → Logique métier pour l'ajout et la récupération des joueurs.  
- **player.module.ts** → Module pour encapsuler la gestion des joueurs.  

### `Ranking/`  
- **ranking.controller.ts** → Routes pour récupérer le classement des joueurs.  
- **ranking.service.ts** → Calcul du classement Elo après chaque match.  
- **ranking.module.ts** → Gestion des classements sous forme de module.  

## Fonctionnalités Implémentées  

### Création de joueurs  
**URL** : `POST /api/player`  
- Ajout d’un joueur via une requête JSON avec un identifiant unique.  
- Le joueur reçoit un classement Elo initial definit en fonction de la moyenne des joueurs existants ou à 1000 si aucun joueur n'existe.  
- Gestion des erreurs:
    - Un joueur déjà existant (`409 Conflict`).  
    - Identifiant manquant (`400 Bad Request`).

**Exemple de requête :**  
```json
{
  "id": "player123"
}
```  
**Exemple de réponse (succès) :**  
```json
{
  "id": "player123",
  "rank": 1000
}
```  

### Gestion des matchs  
**URL** : `POST /api/match`  
- Enregistrement des résultats d'un match entre deux joueurs.  
- Calcul et mise à jour des classements Elo selon le résultat et de l'Elo de chaque joueur.  
- Possibilité de déclarer un match nul (`draw: true`).
- Gestion des erreurs:
    - 	Soit le gagnant, soit le perdant n'existe pas (`422 Not Found`).  

**Exemple de requête :**  
```json
{
  "winner": "playerA",
  "loser": "playerB",
  "draw": false
}
```  
**Exemple de réponse (succès) :**  
```json
{
  "winner": {
    "id": "playerA",
    "rank": 1050
  },
  "loser": {
    "id": "playerB",
    "rank": 950
  }
}
```  

### Mise à jour du classement Elo  
**URL** : `GET /api/ranking`  
- Récupération du classement actuel des joueurs.  
- Gestion des erreurs si aucun joueur n’existe (`404 Not Found`).  

**Exemple de réponse :**  
```json
[
  {
    "id": "playerA",
    "rank": 1200
  },
  {
    "id": "playerB",
    "rank": 1000
  }
]
```  

### Émission d’événements en temps réel  
**URL** : `GET /api/ranking/events`  
- Mise en place d'un **EventEmitter** pour notifier les mises à jour.  
- Permet aux clients de s’abonner aux changements de classement.  

**Exemple de réponse (flux SSE) :**  
```json
{
  "type": "update",
  "player": {
    "id": "playerA",
    "rank": 1250
  }
}
```  

### Creation de la base de données
- **Création des entités Player et Match** pour stocker les informations dans une base de données SQLite.
- **Relations entre les entités** pour lier les matchs aux joueurs.

J’ai mis en place une base de données relationnelle avec SQLite en utilisant TypeORM, qui permet une gestion efficace des entités et des relations.

```ts
TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
````

## Tests
La réalisation de tests E2E (End-to-End) permet de vérifier le bon fonctionnement des routes et des services de l'application en simulant des interactions réelles avec l'API. Ces tests couvrent l'ensemble du flux de travail, depuis l'envoi de requêtes HTTP jusqu'à la vérification des réponses, en passant par l'interaction avec la base de données.

Exemple de test pour la création d'un joueur
Le test suivant vérifie que l'API permet de créer un joueur avec un identifiant et un rang spécifiés. Il envoie une requête POST à l'endpoint /api/player et vérifie que la réponse contient les informations correctes.

```ts
it('/api/player (POST) - Should create a player', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/player')
      .send({ id: 'test1', rank: 1500 });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe('test1');
    expect(res.body.rank).toBe(1500);
  });
```

### Pour lancer les tests
Pour exécuter les tests E2E, utilisez la commande suivante :

```bash
pnpm test:e2e
```
Cette commande exécutera tous les tests E2E définis dans votre projet, en vérifiant que les différentes routes et services fonctionnent comme prévu.


## Lancez le projet


### Installer NVM

Linux avec curl

```bash	

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

```

### Installer NodeJS

La suite de commande installe la version 22 (LTS en décembre 2024). Vous pouvez remplacer 22 par la version de NodeJS que vous souhaitez installer.

```bash
nvm install 22
nvm use 22
nvm alias default 22
```	

### Installer un gestionnaire de dépendances alternatif (ex: PNPM)
```bash
corepack enable pnpm
corepack use pnpm@8
```

### Installer les dépendances

```bash
pnpm install
```

### Lancer le serveur

```bash
pnpm run apps:server:dev
```

### Lancer le client

```bash
pnpm run apps:client:dev
```

### Lancer la documentation Swagger

```bash
pnpm run docs:swagger:start
```


## Conclusion  

Ce projet backend permet la gestion des joueurs, des matchs et du classement Elo, tout en suivant les spécifications Swagger. Grâce à **l'EventEmitter**, les mises à jour sont envoyées en temps réel, assurant une interactivité optimale avec les clients.  

 
