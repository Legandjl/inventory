const express = require("express");

const router = express.Router();
const weaponController = require("../controllers/api_weapon_controller");
const armorController = require("../controllers/api_armor_controller");

// weapon CRUD

router.get("/weapons", weaponController.weapons);

router.get("/weapons/:id", weaponController.weapon_detail);

router.post("/weapons/", weaponController.weapon_create_post);

router.put("/weapons/:id", weaponController.weapon_update_put);

router.delete("/weapons/:id", weaponController.weapon_delete_post);

// armor CRUD

router.get("/armor", armorController.armor);

router.get("/armor/:id", armorController.armor_detail);
/*

router.post("/armor/", armorController.armor_create_post);

router.put("/armor/:id", armorController.armor_update_put);

router.delete("/armor/:id", armorController.armor_delete_post);
*/

module.exports = router;
