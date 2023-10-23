const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getClothes);
router.post("/", controller.addClothe);
router.get("/:id", controller.getClotheById);
router.put("/:id", controller.updateClothe);
router.delete("/:id", controller.deleteClothe);

module.exports = router;
