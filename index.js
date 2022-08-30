const express = require("express");
const path = require("path");
const app = express();

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// public path
app.use(express.static(path.join(__dirname, "public")));
app.set('layout', 'partial/layout/master')

// view path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// listen express with post
app.listen(3000, ()=>{
  console.log("Server started (http://localhost:3000/) !");
});

// express route
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