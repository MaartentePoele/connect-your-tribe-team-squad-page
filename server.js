import express from "express";

import { Liquid } from "liquidjs";

// Vul hier jullie team naam in
const teamName = "Harmony";

// Lees alle eerstejaars personen in
const personResponse = await fetch(
  "https://fdnd.directus.app/items/person/?sort=name&fields=*,squads.squad_id.name,squads.squad_id.cohort&filter[squads][squad_id][tribe][name]=FDND Jaar 1&filter[squads][squad_id][cohort]=2526",
);
const personResponseJSON = await personResponse.json();

const app = express();
app.use(express.static("public"));
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {
  const search = request.query.search;
  const params = {
    fields: "*,squads.*",

    "filter[squads][squad_id][tribe][name]": "FDND Jaar 1",
    "filter[squads][squad_id][cohort]": "2526",
  };

  if (search) {
    params["filter[name][_contains]"] = search;
  }

  // Sorteer op naam
  if (request.query.sort == "name:asc") {
    params["sort"] = "name";
  } else if (request.query.sort == "name:desc") {
    params["sort"] = "-name";
  } else {
    params["sort"] = "name";
  }

  // Filter op team
  if (request.query.filter == "Awesome") {
    params["filter[team][_eq]"] = "Awesome";
  } else if (request.query.filter == "Blaze") {
    params["filter[team][_eq]"] = "Blaze";
  } else if (request.query.filter == "Bliss") {
    params["filter[team][_eq]"] = "Bliss";
  } else if (request.query.filter == "Cheer") {
    params["filter[team][_eq]"] = "Cheer";
  } else if (request.query.filter == "Chill") {
    params["filter[team][_eq]"] = "Chill";
  } else if (request.query.filter == "Cool") {
    params["filter[team][_eq]"] = "Cool";
  } else if (request.query.filter == "Dazzle") {
    params["filter[team][_eq]"] = "Dazzle";
  } else if (request.query.filter == "Delight") {
    params["filter[team][_eq]"] = "Delight";
  } else if (request.query.filter == "Epic") {
    params["filter[team][_eq]"] = "Epic";
  } else if (request.query.filter == "Flex") {
    params["filter[team][_eq]"] = "Flex";
  } else if (request.query.filter == "Flux") {
    params["filter[team][_eq]"] = "Flux";
  } else if (request.query.filter == "Fun") {
    params["filter[team][_eq]"] = "Fun";
  } else if (request.query.filter == "Glow") {
    params["filter[team][_eq]"] = "Glow";
  } else if (request.query.filter == "Happy") {
    params["filter[team][_eq]"] = "Happy";
  } else if (request.query.filter == "Harmony") {
    params["filter[team][_eq]"] = "Harmony";
  } else if (request.query.filter == "Hype") {
    params["filter[team][_eq]"] = "Hype";
  } else if (request.query.filter == "Jolly") {
    params["filter[team][_eq]"] = "Jolly";
  } else if (request.query.filter == "Joy") {
    params["filter[team][_eq]"] = "Joy";
  } else if (request.query.filter == "Peak") {
    params["filter[team][_eq]"] = "Peak";
  } else if (request.query.filter == "Rad") {
    params["filter[team][_eq]"] = "Rad";
  } else if (request.query.filter == "Radiant") {
    params["filter[team][_eq]"] = "Radiant";
  } else if (request.query.filter == "Rocket") {
    params["filter[team][_eq]"] = "Rocket";
  } else if (request.query.filter == "Spark") {
    params["filter[team][_eq]"] = "Spark";
  } else if (request.query.filter == "Spirit") {
    params["filter[team][_eq]"] = "Spirit";
  } else if (request.query.filter == "Storm") {
    params["filter[team][_eq]"] = "Storm";
  } else if (request.query.filter == "Sunny") {
    params["filter[team][_eq]"] = "Sunny";
  } else if (request.query.filter == "Zen") {
    params["filter[team][_eq]"] = "Zen";
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

  // Haalt data op per persoon
  const personResponse = await fetch(
    "https://fdnd.directus.app/items/person/?" + new URLSearchParams(params),
  );
  const personResponseJSON = await personResponse.json();

  // Voor de like button
  const personDetailResponse = await fetch(
    "https://fdnd.directus.app/items/person/" + request.params.id,
  );
  const personDetailResponseJSON = await personDetailResponse.json();

  const likesForPersonResponse = await fetch(
    `https://fdnd.directus.app/items/messages?filter[for]=Person ${request.params.id} / Geliket`,
  );
  const likesForPersonResponseJSON = await likesForPersonResponse.json();
  console.log(likesForPersonResponseJSON.data.length);


  response.render("index.liquid", {
    persons: personResponseJSON.data,
    person: personDetailResponseJSON.data,
    liked: likesForPersonResponseJSON.data.length >= 1,
  });
});

app.post("/:id/like", async function (request, response) {
  await fetch("https://fdnd.directus.app/items/messages", {
    method: "POST",
    body: JSON.stringify({
      for: `Person ${request.params.id} / Geliket`,
      from: "",
      text: "",
    }),
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });

  response.redirect(303, "/");
});

app.post("/:id/unlike", async function (request, response) {
  const likesForPersonResponse = await fetch(
    `https://fdnd.directus.app/items/messages?filter[for]=Person ${request.params.id} / Geliket`,
  );
  const likesForPersonResponseJSON = await likesForPersonResponse.json();
  const likesForPersonResponseID = likesForPersonResponseJSON.data[0].id;

  await fetch(
    `https://fdnd.directus.app/items/messages/${likesForPersonResponseID}`,
    {
      method: "DELETE",
    },
  );

  response.redirect(303, "/");
});




























































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