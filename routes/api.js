const express = require("express");

const router = express.Router();
const weaponController = require("../controllers/api_weapon_controller");
const armorController = require("../controllers/api_armor_controller");
const miscController = require("../controllers/api_misc_controller");
const aidController = require("../controllers/api_aid_controller");
// weapon CRUD

router.get("/weapons", weaponController.weapons);

router.get("/weapons/:id", weaponController.weapon_detail);

router.post("/weapons/", weaponController.weapon_create_post);

router.put("/weapons/:id", weaponController.weapon_update_put);

router.delete("/weapons/:id", weaponController.weapon_delete_post);

// armor CRUD

router.get("/armor", armorController.armor);

router.get("/armor/:id", armorController.armor_detail);

// misc CRUD

router.get("/misc", miscController.misc);

router.get("/misc/:id", miscController.misc_detail);

router.get("/aid", aidController.aid);

router.get("/aid/:id", aidController.aid_detail);

/*
router.post("/armor/", armorController.armor_create_post);

router.put("/armor/:id", armorController.armor_update_put);

router.delete("/armor/:id", armorController.armor_delete_post);
*/

module.exports = router;
