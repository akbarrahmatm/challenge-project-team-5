const router = require("express").Router();

/*
    Import router disini, Contoh : 
    const authRouter = require("./authRouter");
*/
const Customer = require("./customerRouter");

/*
    Definisikan router disini, Contoh :
    router.use("/api/v1/auth", authRouter);
*/
router.use("/api/v1/customer", Customer);

module.exports = router;
