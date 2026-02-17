import express from "express";

import { Liquid } from "liquidjs";

// Vul hier jullie team naam in
const teamName = "Harmony";

const app = express();
app.use(express.static("public"));
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

// app.get("/", async function (request, response) {
//   // Filter eerst de berichten die je wilt zien, net als bij personen
//   // Deze tabel wordt gedeeld door iedereen, dus verzin zelf een handig filter,
//   // bijvoorbeeld je teamnaam, je projectnaam, je person ID, de datum van vandaag, etc..

//   const params = {
//     "filter[for]": `Team ${teamName}`,
//   };

//   // Maak hiermee de URL aan, zoals we dat ook in de browser deden
//   const apiURL =
//     "https://fdnd.directus.app/items/messages?" + new URLSearchParams(params);

//   // Laat eventueel zien wat de filter URL is
//   // (Let op: dit is _niet_ de console van je browser, maar van NodeJS, in je terminal)
//   // console.log('API URL voor messages:', apiURL)

//   // Haal daarna de messages data op
//   const messagesResponse = await fetch(apiURL);

//   // Lees van de response van die fetch het JSON object in, waar we iets mee kunnen doen
//   const messagesResponseJSON = await messagesResponse.json();

//   // Controleer eventueel de data in je console
//   // console.log(messagesResponseJSON)

//   // En render de view met de messages
//   response.render("index.liquid", {
//     teamName: teamName,
//     messages: messagesResponseJSON.data,
//     person: personResponseJSON.data,
//   });
// });

app.get("/", async function (request, response) {
  const params = {
    fields: "*,squads.*",

    "filter[squads][squad_id][tribe][name]": "FDND Jaar 1",
    "filter[squads][squad_id][cohort]": "2526",
  };

  // Sorteer op naam
  if (request.query.sort == "name:asc") {
    params["sort"] = "name";
  } else if (request.query.sort == "name:desc") {
    params["sort"] = "-name";
  } else {
    params["sort"] = "name";
  }

  // Filter op team
  if (request.query.filter == "Cheer") {
    params["filter[team][_eq]"] = "Cheer";
  } else if (request.query.filter == "Dazzle") {
    params["filter[team][_eq]"] = "Dazzle";
  } else if (request.query.filter == "Glow") {
    params["filter[team][_eq]"] = "Glow";
  } else if (request.query.filter == "Harmony") {
    params["filter[team][_eq]"] = "Harmony";
  } else if (request.query.filter == "Radiant") {
    params["filter[team][_eq]"] = "Radiant";
  } else if (request.query.filter == "Rocket") {
    params["filter[team][_eq]"] = "Rocket";
  } else if (request.query.filter == "Spark") {
    params["filter[team][_eq]"] = "Spark";
  } else if (request.query.filter == "Sunny") {
    params["filter[team][_eq]"] = "Sunny";
  } else {
    params["sort"] = "name";
  }

  // Filter op squad
  if (request.query.filter == "1J") {
    params["filter[squads][squad_id][name][_eq]"] = "1J";
  } else if (request.query.filter == "1I") {
    params["filter[squads][squad_id][name][_eq]"] = "1I";
  } else {
    params["sort"] = "name";
  }

  // Filter op emoji
  if (request.query.filter == "🧌") {
    params["filter[vibe_emoji][_eq]"] = "🧌";
  } else if (request.query.filter == "🍗") {
    params["filter[vibe_emoji][_eq]"] = "🍗";
  } else if (request.query.filter == "❤️") {
    params["filter[vibe_emoji][_eq]"] = "❤️";
  } else if (request.query.filter == "🫡") {
    params["filter[vibe_emoji][_eq]"] = "🫡";
  } else if (request.query.filter == "🤑") {
    params["filter[vibe_emoji][_eq]"] = "🤑";
  } else if (request.query.filter == "👀") {
    params["filter[vibe_emoji][_eq]"] = "👀";
  } else if (request.query.filter == "🦧") {
    params["filter[vibe_emoji][_eq]"] = "🦧";
  } else if (request.query.filter == "🪤") {
    params["filter[vibe_emoji][_eq]"] = "🪤";
  } else if (request.query.filter == "🫧") {
    params["filter[vibe_emoji][_eq]"] = "🫧";
  } else if (request.query.filter == "💅🏻") {
    params["filter[vibe_emoji][_eq]"] = "💅🏻";
  } else {
    params["sort"] = "name";
  }

  const personResponse = await fetch(
    "https://fdnd.directus.app/items/person/?" + new URLSearchParams(params),
  );

  const personResponseJSON = await personResponse.json();

  response.render("index.liquid", {
    persons: personResponseJSON.data,
  });
});

app.post("/", async function (request, response) {
  // Stuur een POST request naar de messages tabel
  // Een POST request bevat ook extra parameters, naast een URL
  await fetch("https://fdnd.directus.app/items/messages", {
    // Overschrijf de standaard GET method, want ook hier gaan we iets veranderen op de server
    method: "POST",

    // Geef de body mee als JSON string
    body: JSON.stringify({
      // Dit is zodat we ons bericht straks weer terug kunnen vinden met ons filter
      for: `Team ${teamName}`,
      // En dit zijn onze formuliervelden
      from: request.body.from,
      text: request.body.text,
    }),

    // En vergeet deze HTTP headers niet: hiermee vertellen we de server dat we JSON doorsturen
    // (In realistischere projecten zou je hier ook authentication headers of een sleutel meegeven)
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  // Stuur de browser daarna weer naar de homepage
  response.redirect(303, "/");
});

// ---------------
// TESTEN MET POST
// ---------------

app.get("/person/:id", async function (request, response) {
  const personDetailResponse = await fetch(
    "https://fdnd.directus.app/items/person/" + request.params.id,
  );
  const personDetailResponseJSON = await personDetailResponse.json();

  const likesForPersonResponse = await fetch(
    `https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`,
  );
  const likesForPersonResponseJSON = await likesForPersonResponse.json();

  response.render("person.liquid", {
    person: personDetailResponseJSON.data,
    liked: likesForPersonResponseJSON.data.length == 1,
  });
});

app.post("/person/:id/like", async function (request, response) {
  await fetch("https://fdnd.directus.app/items/messages", {
    method: "POST",
    body: JSON.stringify({
      for: `Team ${teamName} / Person ${request.params.id} / Like`,
      from: "",
      text: "",
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  response.redirect(303, `/person/${request.params.id}`);
});

app.post("/person/:id/unlike", async function (request, response) {
  const likesForPersonResponse = await fetch(
    `https://fdnd.directus.app/items/messages?filter[for]=Team ${teamName} / Person ${request.params.id} / Like`,
  );
  const likesForPersonResponseJSON = await likesForPersonResponse.json();
  const likesForPersonResponseID = likesForPersonResponseJSON.data[0].id;

  await fetch(
    `https://fdnd.directus.app/items/messages/${likesForPersonResponseID}`,
    {
      method: "DELETE",
    },
  );

  response.redirect(303, `/person/${request.params.id}`);
});

// ------------
// EINDE TESTEN
// ------------

































// ------------------------------
// CODE VOOR METE VANAF REGEL 250
// ------------------------------




// --------------------
// EINDE CODE VOOR METE
// --------------------

app.set("port", process.env.PORT || 8000);

if (teamName == "") {
  console.log("Voeg eerst de naam van jullie team in de code toe.");
} else {
  app.listen(app.get("port"), function () {
    console.log(`Application started on http://localhost:${app.get("port")}`);
  });
}
