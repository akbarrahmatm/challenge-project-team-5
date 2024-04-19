const router = require("express").Router();

/*
    Import router disini, Contoh : 
    const authRouter = require("./authRouter");
*/
const bookingRouter = require("./bookingRouter")

const authRouter = require("./authRouter");

/*
    Definisikan router disini, Contoh :
    router.use("/api/v1/auth", authRouter);
*/
router.use("/api/v1/booking", bookingRouter);

router.use("/api/v1/auth", authRouter);

module.exports = router;
