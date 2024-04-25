const router = require("express").Router();

const tourPackage = require("../controllers/tourPackageController");
const authenticate = require("../middlewares/authenticate");
const upload = require('../utils/multerConfig')

router.get("/getAll", tourPackage.findTourPackages)
router.get("/:id", tourPackage.findTourPackageById)
router.post("/create/", authenticate, tourPackage.createTourPackage);
router.patch("/update/:id", authenticate, tourPackage.updateTourPackage);
router.delete("/delete/tour/:id", authenticate, tourPackage.deleteTourPackage);
// router.post("/upload", upload.single('poto'), tourPackage.uploadImage);
router.post("/upload", upload.fields([{ name: 'poto' }, { name: 'data' }]), tourPackage.uploadPoto);
router.post("/gambar", upload.single("image"), tourPackage.uploadGambar);

// router.post('/poto', upload.fields([{ name: 'poto' }, { name: 'data' }]), tourPackage.gambarTest);

// router.post("/upload", upload.fields([{ name: 'poto' }, { name: 'data' }]), tourPackage.uploadImage)

module.exports = router