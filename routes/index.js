const router = require("express").Router();
const storeRouter = require("./storeRouter");
/*
    Import other routers here, for example:
    const authRouter = require("./authRouter");
*/

router.use("/api/v1/store", storeRouter);
/*
    Define other routes here, for example:
    router.use("/api/v1/auth", authRouter);
*/

module.exports = router;
