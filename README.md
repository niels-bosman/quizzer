# Software Guidebook

# UI schetsen

Via onderstaande link kan het ontwerp uit Figma ingezien worden.

[https://www.figma.com/file/J3ZDycigWgUzjCl3kdgrQO/DWA-Quizzer?node-id=0%3A1](https://www.figma.com/file/J3ZDycigWgUzjCl3kdgrQO/DWA-Quizzer?node-id=0%3A1)

# Resources

Dit zijn de resources gevonden bij het doorlezen van de Quizzer casus.

1. Teams
2. Categories
3. Questions
4. Rounds
5. Lobbies

# Communicatie protocollen

Dit zijn de beschrijvingen van alle communicatie protocollen in de quizzer applicatie. Het bevat alle Websockets en API
routes.

# Websockets

|Flow  |Actie                            |Type                                             |
|------|---------------------------------|-------------------------------------------------|
|Quiz Master → Server|Nieuwe lobby                     |`{ type: 'MASTER_CONNECT', data: { lobbyId: String }`  |
|Quiz Master → Server|Team verwijderen                 |`{ type: 'MASTER_REMOVE_TEAM', data: { teamName: String } }`|
|Quiz Master → Server|Ronde starten                    |`{ type: 'MASTER_NEW_ROUND' }`                     |
|Quiz Master → Server|Selecteer categorie              |`{ type: 'MASTER_SET_CATEGORIES', data: { categories: [String] } }`|
|Quiz Master → Server|Vraag stellen                    |`{ type: 'MASTER_NEW_QUESTION', data: { question: String } }`|
|Quiz Master → Server|Vraag sluiten                    |`{ type: 'MASTER_STOP_QUESTION' }`                 |
|Quiz Master → Server|Antwoord beoordelen              |`{ type: 'MASTER_REVIEW_ANSWER', data: { isCorrent: Boolean, questionId: Number } }`|
|Quiz Master → Server|Ronde stoppen                    |`{ type: 'MASTER_STOP_ROUND' }`                    |
|Quiz Master → Server|Quiz stoppen                     |`{ type: 'MASTER_STOP_LOBBY' }`                    |
|      |                                 |                                                 |
|Team → Server|Meedoen aan lobby                |`{ type: 'TEAM_CONNECT', data: { lobbyId: String, teamName: String } }`|
|Team → Server|Antwoord indienen                |`{ type: 'TEAM_SUBMIT_ANSWER', data: { teamName: String, answer: String } }`|
|      |                                 |                                                 |
|Scoreboard → Server|Verbinden met socket             |`{ type: 'SCOREBOARD_CONNECT' }`                   |
|      |                                 |                                                 |
|Server → Team|Team verwijderd                  |`{ type: 'TEAM_REMOVED' }`                         |
|Server → Team|Nieuwe vraag gesteld              |`{ type: 'NEW_QUESTION' }`                         |
|Server → Team|Quiz afgelopen                   |`{ type: 'LOBBY_ENDED' }`                          |
|      |                                 |                                                 |
|Server → Quiz Master|Team binnengekomen               |`{ type: 'TEAM_JOINED' }`                          |
|Server → Quiz Master|Antwoord binnengekomen           |`{ type: 'NEW_ANSWER' }`                           |
|      |                                 |                                                 |
|Server → Scoreboard|Team binnengekomen               |`{ type: 'TEAM_JOINED' }`                          |
|Server → Scoreboard|Team verwijderd                  |`{ type: 'TEAM_REMOVED' }`                         |
|Server → Scoreboard|Vraag gesteld                    |`{ type: 'NEW_QUESTION' }`                         |
|Server → Scoreboard|Team heeft vraag beantwoord      |`{ type: 'NEW_ANSWER' }`                           |
|Server → Scoreboard|Rondepunten toegekend            |`{ type: 'POINTS_ADDED' }`                         |
|Server → Scoreboard|Antwoord bekend                  |`{ type: 'QUESTION_RESULTS' }`                     |
|Server → Scoreboard|Quiz afgelopen                   |`{ type: 'LOBBY_ENDED' }`                          |

# API Routes

|Method|URL                              |Info                                               |
|------|---------------------------------|---------------------------------------------------|
|POST  |`/lobbies`                         |Maak een nieuwe lobby aan                        |
|GET   |`/lobbies/:lobbyId`                |Ophalen van een lobby                            |
|PUT   |`/lobbies/:lobbyId`                |Wijzig een lobby                                 |
|GET   |`/lobbies/:lobbyId/teams`          |Haal alle teams op binnen een specifieke lobby   |
|POST  |`/lobbies/:lobbyId/teams`          |Maak een nieuw team aan voor een specifieke lobby|
|GET   |`/lobbies/:lobbyId/teams/:teamId`  |Haal een specifiek team op                       |
|PUT   |`/lobbies/:lobbyId/teams/:teamId`  |Update een specifiek team                        |
|DELETE|`/lobbies/:lobbyId/teams/:teamId`  |Verwijder een specifiek team                     |
|GET   |`/categories`                      |Haal alle categorieën op                         |
|GET   |`/categories/:categoryId/questions`|Haal alle vragen van een specifieke categorie op |

# Data-opslag ontwerpen

## Team

```jsx
const teamSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});
```

## Question

```jsx
const questionSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
})
```

## Round

```jsx
const roundSchema = new Schema({
  categories: [String],
  questions: [{
    question: questionSchema,
    givenAnswers: [{
      team: teamSchema,
      answer: {
        type: String,
        required: true,
      },
      correct: {
        type: Boolean,
        default: false,
      },
    }],
  }],
  currentQuestion: questionSchema,
});
```

## Lobby

```jsx
const lobbySchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  rounds: [roundSchema],
  teams: [teamSchema],
});
```

# Client state ontwerpen

Reducers en hun store vastleggen **resultaat:** een overzicht van de datastructuur van de state, en welke reducers er
zijn en wat ze doen.

## Team

### State

- lobbyId
- currentQuestion
- questionNumber
- questionOpen
- isAnswered

### Reducers

**Quiz reducer**

Deze reducer past de state van de app aan op basis van de inkomende websocket messages.

## Quiz master

### State

- lobbyId
- teams
- currentQuestion
- categories
- selectedCategories
- questions
- questionNumber
- questionOpen

### Reducers

**Question reducer**

Heeft toegang tot de lijst van vragen beschikbaar om te kiezen op basis van de categorie. Past deze state aan als er een
actieve geset wordt of als er gerefresht wordt de volgorde.

**Category reducer**

Bevat de data van de mogelijke categorieën en de actieve categorie. Kan deze data ook beïnvloeden wanneer de quizmaster
categorieën selecteert.

**Quiz reducer**

Bevat alle basis state van de quiz, bijvoorbeeld de lobby code en teams.

## Scoreboard

### State

- lobby (naam, code)
- team (naam, antwoord, score)
- question (vraag, antwoord)
- finished
- star

### Reducers

**Quiz reducer**

Bevat alle basis data om te tonen in de UI, deze reducer wordt aangeroepen door de WebSocket berichten om te zetten naar
actions die dan opgevangen worden.

# Express structuur

## Websocket

We gaan één websocket server gebruiken die alle verbindingen van de 3 clients kan verwerken. Hierdoor kunnen we gemakkelijk berichten sturen tussen de clients. De 3 clients maken een websocket verbinding aan met de server.

## Routers

We hebben een router per resource. De routers zijn opgesplitst in individuele bestanden. Dit is volgens een RESTful manier opgezet. Elke resource heeft zijn eigen endpoints. Deze routes roepen vervolgens functies aan die in controllers staan.

## Middleware

In de server side code moet middleware komen om een session te controleren om zo bijvoorbeeld te bepalen welk team een request doet.
