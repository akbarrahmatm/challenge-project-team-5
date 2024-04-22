const router = require("express").Router();

const tourPackage = require("../controllers/TourController");
const authenticate = require("../middlewares/authenticate");

router.get("/getAll", tourPackage.findTourPackages)
router.get("/:id", tourPackage.findTourPackageById)
router.post("/create/", authenticate, tourPackage.createTourPackage);
router.patch("/update/:id", authenticate, tourPackage.updateTourPackage);
router.delete("/delete/tour/:id", authenticate, tourPackage.deleteTourPackage);


module.exports = router