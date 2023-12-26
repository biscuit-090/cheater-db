const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'cheaterDB'
});

db.connect((err) => {
    if (err) { throw err; }
    console.log('Connected to MySQL');
});

const addCheaterEntry = (data) => {
    // Destructure data from the request
    const { game, profile, esp, aimbot, crit, association, mic, in_party, notes, scout, soldier, pyro, demoman, heavy, engineer, medic, sniper, spy, burner_acc, main_acc, prev_vac_ban, won_game, lost_game, was_kicked, text_chat, kicks_others, is_racist } = data;
  
    // Choose the correct table based on the game
    let tableName = '';
    switch (game) {
      case 'Team Fortress 2':
        tableName = 'tf2';
        break;
      // Add more cases if there are more games
      default:
        throw new Error('Invalid game selected');
    }
  
    // Create the SQL query
    const query = `
      INSERT INTO ${tableName} (game, profile, esp, aimbot, crit, association, mic, in_party, notes, scout, soldier, pyro, demoman, heavy, engineer, medic, sniper, spy, burner_acc, main_acc, prev_vac_ban, won_game, lost_game, was_kicked, text_chat, kicks_others, is_racist)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [game, profile, esp, aimbot, crit, association, mic, in_party, notes, scout, soldier, pyro, demoman, heavy, engineer, medic, sniper, spy, burner_acc, main_acc, prev_vac_ban, won_game, lost_game, was_kicked, text_chat, kicks_others, is_racist];
  
    // Execute the query
    db.query(query, values, (err, results) => {
      if (err) throw err;
      console.log('Entry added:', results.insertId);
    });
  };

app.post('/add-cheater', (req, res) => {
    try {
      addCheaterEntry(req.body);
      res.status(200).send('Entry added successfully');
    } catch (error) {
      res.status(400).send('Error adding entry: ' + error.message);
    }
});

// Add routes for CRUD operations...

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
