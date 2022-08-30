const express = require("express");
const path = require("path");
const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

/* set public path */
app.use(express.static(path.join(__dirname, "public")));
app.set('layout', 'partial/layout/master')

/* view path */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// listen express with post
app.listen(3000, ()=>{
	console.log("Server started (http://localhost:3000/) !");
});

/* install sqlite3 */
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('database/chinook.db',sqlite3.OPEN_READWRITE, err => {
	if (err) {
		return console.error(err.message);
	}
	console.log("Successful connection to the database");
});

// express route
const router = express.Router();
app.get("/", (req,res) => {
	res.render("home",{
		_active: 'home'
	});
});
app.get("/about", (req,res) => {
	app.set('sidebarActive', 'about');
	var tagline = "No programming concept is complete without a cute animal mascot shikot hridoy.";
	res.render("about",{
		_active: 'about',
		tagline: tagline
	});
});

app.get("/source", (req,res) => {
	const sql = "select * from customers";
	db.all(sql, [], (err, rows) => {
		if (err) {
			return console.error(err.message);
		}
		res.render("source",{
			_active: 'source',
			users: rows
		});
	});
});