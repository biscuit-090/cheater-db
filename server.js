const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your React app's origin
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tf2'
});

db.connect((err) => {
    if (err) { throw err; }
    console.log('Connected to MySQL');
});

app.get('/getSteamUserData', async (req, res) => {
  const input = req.query.input;
  const apikey = '1AD3C3EC1305F3E6D667DC7B501C46DB';
  
  try {
    let steamid;

    if (isNaN(input)) { // Assuming Vanity URL
      const vanityResponse = await fetch(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${apikey}&vanityurl=${input}`);
      const vanityData = await vanityResponse.json();
      steamid = vanityData.response?.steamid;
      console.log('Vanity URL detected: ' + steamid);
    } else {
      steamid = input;
      console.log('Steam profile ID detected: ' + steamid);
    }
    if (!steamid) {
      throw new Error('Unable to resolve Steam ID');
    }

    const profileURL = `https://steamcommunity.com/profiles/${steamid}`

    const profileResponse = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apikey}&steamids=${steamid}`);
    const profileData = await profileResponse.json();
    const banResponse = await fetch(`http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${apikey}&steamids=${steamid}`);
    const banData = await banResponse.json();
    const steamLevelResponse = await fetch(`http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key=${apikey}&steamid=${steamid}`);
    const steamLevelData = await steamLevelResponse.json();
    const allGamesResponse = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apikey}&steamid=${steamid}&include_appinfo=1&include_played_free_games=1&format=json&appids_filter=440`)
    const allGamesData = await allGamesResponse.json();

    // Combining the data into one object
    const combinedData = {
      profileURL: profileURL,
      profileData: profileData,
      banData: banData,
      allGamesData: allGamesData,
      steamLevelData: steamLevelData,
    };
    res.json(combinedData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Profile data could not be retrieved.');
  }
});

const addCheaterEntry = (data) => {

  const {
    game,
    profile_url,
    scout,
    soldier,
    pyro,
    demoman,
    heavy,
    engineer,
    medic,
    sniper,
    spy,
    esp,
    aimbot,
    crit,
    no_spread,
    lag_switch,
    association,
    mic,
    text_chat,
    is_racist,
    types_1,
    types_question_mark,
    binds,
    burner_acc,
    main_acc,
    vac_ban,
    trade_ban,
    community_ban,
    private_profile,
    acc_age,
    game_hours,
    steam_level,
    in_party,
    won_game,
    lost_game,
    was_kicked,
    kicks_others,
    hvh,
    notes,
    has_unusuals,
    has_australiums,
    edgy_hacker_profile,
    cheater_steam_group,
    pronouns,
    disables_comments,
    responds_comments,
    deletes_comments,
    is_furry,
    is_brony,
    is_lgbt,
    anime,
    hentai,
    salt,
    displays_accusations,
    pc_specs,
    denies_cheating,
    brags_cheating,
    has_youtube,
    has_twitch,
    country,
    num_vac_bans,
    num_game_bans,
    days_since_last_ban,
  } = data;

  // Insert into main table
  let queryMain = 'INSERT INTO main (game, profile_url) VALUES (?, ?)';
  let valuesMain = [game, profile_url];

  // Insert into classes_played
  let queryClasses = 'INSERT INTO classes_played (profile_url, scout, soldier, pyro, demoman, heavy, engineer, medic, sniper, spy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let valuesClasses = [profile_url, scout, soldier, pyro, demoman, heavy, engineer, medic, sniper, spy];

  // Insert into type_of_cheats
  let queryCheats = 'INSERT INTO type_of_cheats (profile_url, esp, aimbot, crit, no_spread, lag_switch, association) VALUES (?, ?, ?, ?, ?, ?, ?)';
  let valuesCheats = [profile_url, esp, aimbot, crit, no_spread, lag_switch, association];

  // Insert into communications
  let queryComm = 'INSERT INTO communications (profile_url, mic, text_chat, is_racist, types_1, types_question_mark, binds) VALUES (?, ?, ?, ?, ?, ?, ?)';
  let valuesComm = [profile_url, mic, text_chat, is_racist, types_1, types_question_mark, binds];

  // Insert into account_info
  let queryAccount = 'INSERT INTO account_info (profile_url, burner_acc, main_acc, vac_ban, trade_ban, community_ban, private_profile, acc_age, game_hours, steam_level, num_vac_bans, num_game_bans, days_since_last_ban) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let valuesAccount = [profile_url, burner_acc, main_acc, vac_ban, trade_ban, community_ban, private_profile, acc_age, game_hours, steam_level, num_vac_bans, num_game_bans, days_since_last_ban];

  // Insert into game_behavior
  let queryGame = 'INSERT INTO game_behavior (profile_url, in_party, won_game, lost_game, was_kicked, kicks_others, hvh) VALUES (?, ?, ?, ?, ?, ?, ?)';
  let valuesGame = [profile_url, in_party, won_game, lost_game, was_kicked, kicks_others, hvh];

  // Insert into notes
  let queryNotes = 'INSERT INTO notes (profile_url, notes) VALUES (?, ?)';
  let valuesNotes = [profile_url, notes];

  // Insert into profile_info
  let queryProfileInfo = 'INSERT INTO profile_info (profile_url, has_unusuals, has_australiums, edgy_hacker_profile, cheater_steam_group, pronouns, disables_comments, responds_comments, deletes_comments, is_furry, is_brony, is_lgbt, anime, hentai, salt, displays_accusations, pc_specs, denies_cheating, brags_cheating, has_youtube, has_twitch, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let valuesProfileInfo = [profile_url, has_unusuals, has_australiums, edgy_hacker_profile, cheater_steam_group, pronouns, disables_comments, responds_comments, deletes_comments, is_furry, is_brony, is_lgbt, anime, hentai, salt, displays_accusations, pc_specs, denies_cheating, brags_cheating, has_youtube, has_twitch, country];
  
  // Execute the queries
  const insertData = async () => {
    try {
      db.query(queryMain, valuesMain);
      db.query(queryClasses, valuesClasses);
      db.query(queryCheats, valuesCheats);
      db.query(queryComm, valuesComm);
      db.query(queryAccount, valuesAccount);
      db.query(queryGame, valuesGame);
      db.query(queryNotes, valuesNotes);
      db.query(queryProfileInfo, valuesProfileInfo);

      const timestamp = new Date().toLocaleString();
      console.log(`Entry for profile ${profile_url} added @${timestamp}`);

    } catch (err) {
        throw err;
    }
  };

  insertData();
};

app.post('/add-cheater', (req, res) => {
    try {
      addCheaterEntry(req.body);
      const timestamp = new Date().toLocaleString();
      res.status(200).send(`Entry added successfully - ${timestamp}`);
    } catch (error) {
      const timestamp = new Date().toLocaleString();
      res.status(400).send(`Error adding entry: ${error.message} - ${timestamp}`);
    }
});

// Add routes for CRUD operations...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
