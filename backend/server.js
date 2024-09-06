const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ccihm'
})


/* LOGIN */
const session = express();
session.use(cors());
session.use(express.json());
session.post('/login', (req, res) => {
  const sql = "SELECT *,COUNT(*) as Nbre FROM `users` WHERE email= ? AND pswd = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

session.post('/register', (req, res) => {
  const sql = "INSERT INTO users(pseudo, email,password,type) VALUES(?)";
  const values = [
    req.body.pseudo,
    req.body.email,
    req.body.password,
    req.body.type
  ]
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


  /********TABLE MEMBRE******* */
session.get('/membre', (req, res) => {
  const sql = "SELECT * FROM membre ORDER BY id DESC"; 
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})
session.get('/membre/read/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM membre WHERE id=?";
  db.query(sql,[id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})
session.delete('/membre/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM membre WHERE id=?";
  db.query(sql,[id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

session.post('/membre', (req, res) => {
  const sql = "INSERT INTO membre(nom,prenom,email,telephone,cin,adresse,datenaiss,sexe,type,dateadhesion) VALUES(?,CURRENT_DATE())";
  const membre = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.telephone,
    req.body.cin,
    req.body.adresse,
    req.body.datenaiss,
    req.body.sexe,
    req.body.type
  ]
  db.query(sql, [membre], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})
session.put('/membre/update/:id', (req, res) => {
  const sql = "UPDATE membre SET nom = ?,prenom=? ,email=? ,telephone=? ,adresse=? ,datenaiss=?  WHERE id = ?";
  const id = req.params.id;
  const value = [
    req.body.nom,
    req.body.prenom,
    req.body.email,
    req.body.telephone,
    req.body.adresse,
    req.body.datenaiss
  ]
  db.query(sql, [...value,id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

session.get('/messages', (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY timestamp ASC"; 
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

session.post('/messages', (req, res) => {
  const sql = "INSERT INTO messages (textes,sender,timestamp) VALUES (?, current_timestamp)";
  const message = [
    req.body.textes,
    req.body.sender
  ]
  db.query(sql,[message] , (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

session.get('/users', (req, res) => {
  const sql = "SELECT * FROM users ORDER BY pseudo ASC"; 
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})

session.get('/user/read/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?"; 
  db.query(sql,id, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})
session.delete('/users/delete/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql,[id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  })
})


session.listen(8080, () => {
  console.log("Backend port 8080... ");
})