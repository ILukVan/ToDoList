const express = require("express");
const app = express();
const cors = require("cors");
const { v4 } = require("uuid");
const port = 3000;
const { Client } = require("pg");
let personData1 = [];

// Use CORS middleware
app.use(cors());
app.use(express.json());

const client = new Client({
  user: "ivan",
  password: "qwerty",
  host: "localhost",
  port: "5432",
  database: "task",
});
client.connect();

// создаю таблицу если она не создана
const sql = `create table if not exists tasks(
  id uuid not null primary key, // уникальный uuid
  task varchar(350) not null,   // текст задачи
  check_task boolean,           // значение true or false для отметки выполнения
  id_task float,                // id созданное math.random
  json_task json,                // данные в формате json
  sort serial                   // вспомогательный столбец для сортировки
)`;

// ----------------------------------------------------------- запрос ----------------
app.get("/todos/get-list", (req, res) => {
  const sql = `SELECT * FROM tasks ORDER BY sort`;
  client.query(sql, function (err, results) {
    if (err) console.log(err);


    res.send(results.rows);
    console.log(results.rows);
    // client.end();
  });

});
// ----------------------------------------------------------- запрос ----------------

// ----------------------------------------------------------- добавление новой задачи----------------
app.post("/todos/add-todo", (req, res) => {
  req.body.id = Math.random();
  personData1.push(req.body);
  myValue = req.body;

  const sql = `INSERT INTO tasks(task, id_task, id) VALUES('${myValue.valueText}', '${myValue.id}', '${v4()}') RETURNING *`;
  // client.connect();
  client.query(sql, function (err, results) {
    if (err) {
      console.error("Error inserting data", err);
    } else {

      res.status(200).json(results.rows[0]); //send(personData)
    }
    // client.end();RETURNING *
  });

  // console.log(personData1, "<<<<<<<<<--- personData1 post");
  //res.status(200).json(personData1); //send(personData)
});
// ----------------------------------------------------------- добавление новой задачи----------------

// ----------------------------------------------------------- редактирование----------------
app.put("/todos/edit-todo", (req, res) => {
  let textValue = req.body;


  const sql = `UPDATE tasks SET task = '${textValue.valueText}' WHERE id = '${textValue.id}'`

  client.query(sql, function(err, results) {
    if(err) console.log(err);

});

  const sql2 = `SELECT * FROM tasks ORDER BY sort`;
  client.query(sql2, function (err, results) {
    if (err) console.log(err);

    res.send(results.rows);

    // client.end();
  });

  // res.status(200).json(personData1); //send(personData)
});
// ----------------------------------------------------------- редактирование----------------
// ----------------------------------------------------------- отметка выполнения----------------
app.put("/todos/check-todo", (req, res) => {
  let textValue = req.body;
  console.log(textValue);
  const sql = `UPDATE tasks SET check_task = '${textValue.check}' WHERE id = '${textValue.id}'`

  client.query(sql, function(err, results) {
    if(err) console.log(err);

});

  const sql2 = `SELECT * FROM tasks ORDER BY sort`;
  client.query(sql2, function (err, results) {
    if (err) console.log(err);

    res.send(results.rows);

    // client.end();
  });

  //console.log(personData1[index].id, '<<<<<<<<<--- checkData1');
  //res.status(200).json(personData1); //send(personData)
});
// ----------------------------------------------------------- отметка выполнения----------------
// ----------------------------------------------------------- удаление----------------
app.delete("/todos/del-todo", (req, res) => {
  let textValue = req.body;

  const sql = `DELETE FROM tasks WHERE id = '${textValue.id}'`;
  client.query(sql, function(err, results) {
    if(err) console.log(err);
  
    const sql2 = `SELECT * FROM tasks ORDER BY sort`;
    client.query(sql2, function (err, results) {
      if (err) console.log(err);
  
      res.send(results.rows);

    });

});
 //res.status(200).json(personData1); //send(personData)
})
// ----------------------------------------------------------- удаление----------------

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// client
// 	.connect()
// 	.then(() => {
// 		console.log('Connected to PostgreSQL database');
// 	})
// 	.catch((err) => {
// 		console.error('Error connecting to PostgreSQL database', err);
// 	});

function findUserIndexById(id) {
  for (let i = 0; i < personData1.length; i++) {
    if (personData1[i].id == id) return i;
  }
}
