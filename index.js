const express = require("express");
const {
  gameRouter,
  minggu3Router,
  minggu4Router,
  minggu6Router,
  minggu9Router,
} = require("./src/routes");
const { default: axios } = require("axios");
const Joi = require("joi");
const app = express();
const port = 3001;
require("dotenv").config();

// untuk baca body wajib ada
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// http://localhost:3000
// bila function, seteelah => tidak ada {}, berarti otomatis mode
app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1/game", gameRouter);
// localhost:3000/api/v1/minggu3
app.use("/api/v1/minggu3", minggu3Router);
app.use("/api/v1/minggu4", minggu4Router);
app.use("/api/v1/minggu6", minggu6Router);
app.use("/api/v1/minggu9", minggu9Router);
// GET /minggu7/pokemon?id=
app.get("/api/v1/minggu7/pokemon", async (req, res) => {
  // req.query untuk url yang mainannya adalah ?
  const { id } = req.query;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = response.data; // wajib, karena response itu kembalian status(200), statusText(OK), dan data
  // Pokémon dengan nama ___ dari species ___ ber ID ___, memiliki ability pertama : ___, memiliki move pertama : ___, dan dengan stat Bernama ___ sebesar ___
  const result = `Pokémon dengan nama ${data.name} dari species ${data.species.name} ber ID ${data.id}, memiliki ability pertama : ${data.abilities[0].ability.name}, memiliki move pertama : ${data.moves[0].move.name}, dan dengan stat Bernama ${data.stats[0].stat.name} sebesar ${data.stats[0].base_stat}`;
  return res.status(200).json(result);
});

// GET /minggu7/freegame
// https://localhost:3000/api/v1/minggu7/freegame?platform=browser&category=mmorpg&sort-by=release-date
// https://www.freetogame.com/api/games?platform=browser&category=mmorpg&sort-by=release-date
app.get("/api/v1/minggu7/freegame", async (req, res) => {
  const { platform, category, sortBy } = req.query;
  // const response = await axios.get(
  //   `https://www.freetogame.com/api/games?platform=${platform}&category=${category}&sort-by=${sortBy}`
  // );
  const response = await axios.get(`https://www.freetogame.com/api/games`, {
    params: {
      platform: platform,
      category: category,
      "sort-by": sortBy,
    },
  });
  const data = response.data;
  const result = data.map((item) => {
    return `Game bergenre ${item.genre} di develop oleh ${item.developer} bernama ${item.title}`;
  });
  return res.status(200).json(result);
});
const minggu7Schema = Joi.object({
  game_name: Joi.string().required().min(3).max(30).alphanum(),
  release_date: Joi.date().default(2002).required().iso().less("now"),
  game_mode: Joi.string()
    .required()
    .valid("singleplayer", "multiplayer", "co-op"),
});
app.get("/api/v1/minggu7/validasigame", async (req, res) => {
  try {
    const inputanuser = await minggu7Schema.validateAsync(req.body, {
      abortEarly: false,
    });
    // gunakan inputanuser untuk menjadi data yan disimpan di databaase
    return res.status(200).json(inputanuser);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// bila function ada {}, setelah =>, berarti TULISKAN return nya
app.get("/coba", (req, res) => {
  const klubsepakbola = [
    {
      nama: "Real Madrid",
      basecamp: {
        alamat: "Ngagel Tengah",
        negara: "Spanyol",
      },
      pemain: [
        {
          nama: "Cristiano Ekik",
          status: {
            speed: 100,
            stamina: 100,
            posisi: ["Depan", "Kiper"],
          },
        },
        {
          nama: "Fabian Barthez",
          status: {
            speed: 100,
            stamina: 100,
            drible: 100,
            posisi: [100, "Kiper", { fufu: "fafa" }, false],
          },
        },
      ],
    },
  ];

  let hasil = "";
  const klubbaru = {
    nama: "ISTTS",
    pemain: [{ nama: "Lionel Rico" }],
  };

  klubsepakbola.push(klubbaru);

  for (const klub of klubsepakbola) {
    for (const pemain of klub.pemain) {
      hasil += `Pemain ${pemain.nama} dengan speed ${
        pemain?.status?.speed ?? 30
      }, stamina ${pemain?.status?.stamina ?? 30}, dribble ${
        pemain?.status?.drible ?? 30
      }, posisi ${pemain?.status?.posisi ?? "Cadangan"}, bermain di klub ${
        klub.nama
      }`;
      hasil += `\n`;
    }
  }

  return res.send(hasil);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
