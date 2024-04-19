const router = require("express").Router();
const tourRouter = require("./TourRoutes");

/*
    Import router disini, Contoh : 
    const authRouter = require("./authRouter");
*/

const authRouter = require("./authRouter");

/*
    Definisikan router disini, Contoh :
    router.use("/api/v1/auth", authRouter);
*/

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/tours", tourRouter);

module.exports = router;
