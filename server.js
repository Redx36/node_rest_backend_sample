const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')

AdminJS.registerAdapter(AdminJSSequelize)

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

// load files
app.use(express.static("public"));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Pesto REST API application." });
});

//all models
const db = require("./app/models");
db.sequelize.sync();

//every api routes
require("./app/routes/user.routes")(app);

//options for admin panel
const adminJs = new AdminJS({
    databases: [db],
    rootPath: '/admin',
    branding: {
        colors: {
            primary100: '#FEF7F0',
            highlight: '#ffffff',
            white: '#FEF7F0'
        },
        softwareBrothers: false,
        companyName: 'Pesto',
        logo: '/images/pesto-title.png',
        favicon: '/images/favicon.png',
    },
    // dashboard: {
    //     handler: async () => {
    //
    //     },
    //     component: AdminJS.bundle('./my-dashboard-component')
    // },
})
const router = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, router)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
