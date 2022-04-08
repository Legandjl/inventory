const express = require("express");

const router = express.Router();
const weaponController = require("../controllers/api_weapon_controller");

// weapon CRUD

router.get("/weapons", weaponController.weapons);

router.get("/weapons/:id", weaponController.weapon_detail);

router.post("/weapons/", weaponController.weapon_create_post);

router.put("/weapons/:id", weaponController.weapon_update_put);

router.delete("/weapons/:id", weaponController.weapon_delete_post);

module.exports = router;
