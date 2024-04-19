const router = require("express").Router();
const storeRouter = require("./storeRouter");
/*
    Import other routers here, for example:
    const authRouter = require("./authRouter");
*/
const customerRouter = require("./customerRouter");
const bookingRouter = require("./bookingRouter");
const authRouter = require("./authRouter");

router.use("/api/v1/store", storeRouter);
/*
    Define other routes here, for example:
    router.use("/api/v1/auth", authRouter);
*/
router.use("/api/v1/customer", customerRouter);
router.use("/api/v1/booking", bookingRouter);
router.use("/api/v1/auth", authRouter);

module.exports = router;
