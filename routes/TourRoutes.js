const router = require("express").Router();

const TourPackage = require("../controllers/TourController");
const tour_package = require("../models/tour_package");

router.get("/getAll", TourPackage.findTourPackages)
router.get("/:id", TourPackage.findTourPackageById)
router.post("/create/", TourPackage.createTourPackage);
router.patch("/update/:id", TourPackage.updateTourPackage);
router.delete("/delete/tour/:id", TourPackage.deleteTourPackage);

module.exports = router