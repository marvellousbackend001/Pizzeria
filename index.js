const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
/****************connecting to  mysql************************* */
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "CHIDERA001?.1",
    database: "pizza_order",
    port: "3306",
});
//creating an endpoint for addind pizza
app.post("/pizzas", bodyParser.json(), function (req, res) {
    const { name, price } = req.body;
    const sql = `INSERT INTO pizzas (name, price) VALUES (?, ?)`;
    con.query(sql, [name, price], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
// Endpoint for deleting a pizza by ID
app.delete("/pizzas/:pizza_id", bodyParser.json(), function (req, res) {
    const pizza_id = req.params.pizza_id;
    const sql = `DELETE FROM pizzas WHERE id = ?`;
    con.query(sql, [pizza_id], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});

//endpiont for listing all pizzas
app.get("/api/pizzas", bodyParser.json(), function (req, res) {
    const sql = `SELECT * FROM pizzas`;
    con.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});
//endpoint for ordering pizza
app.post("/order", bodyParser.json(), function (req, res) {
    const sql = 'INSERT INTO orders (created_at) VALUES (CURRENT_TIMESTAMP)';
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
// Endpoint for adding an item to an existing order
app.post("/order/:order_id/items", bodyParser.json(), function (req, res) {
    const { pizza_id, quantity } = req.body;
    const order_id = req.params.order_id;
    const query = `INSERT INTO order_items (order_id, pizza_id, quantity) VALUES (?, ?, ?)`;
    con.query(query, [order_id, pizza_id, quantity], function (err, result) {
        if (err) throw err;
        res.send(result);
    });
});
app.listen(3000)
    , console.log("your server is running at port 3000")
