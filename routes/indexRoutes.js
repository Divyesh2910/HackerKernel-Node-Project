const express = require("express");
const router = express.Router();
const {homepage,
    adminsignup,
    adminsignin,
    adminsignout,
} = require("../controllers/indexController");
const {isAuthenticated} = require("../middlewares/auth.js");

// GET /
router.get("/", homepage);

// POST /signup
router.post("/signup", adminsignup);

// POST /signin
router.post("/signin", adminsignin);

// GET /signout
router.get("/signout", isAuthenticated, adminsignout);


module.exports = router
// 