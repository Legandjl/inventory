var express = require("express");
var router = express.Router();

// Require controller modules.
var aid_controller = require("../controllers/aidController");
var armor_controller = require("../controllers/armorController");
var category_controller = require("../controllers/categoryController");
var misc_controller = require("../controllers/miscController");
const weapon_controller = require("../controllers/weaponController");

// GET  home page.
router.get("/", category_controller.homepage);

/// weapon ROUTES ///

// GET request for creating a weapon. NOTE This must come before routes that display weapon (uses id).
router.get("/weapon/create", weapon_controller.weapon_create_get);

// POST request for creating weapon.
router.post("/weapon/create", weapon_controller.weapon_create_post);

// GET request to delete weapon.
router.get("/weapon/:id/delete", weapon_controller.weapon_delete_get);

// POST request to delete weapon.
router.post("/weapon/:id/delete", weapon_controller.weapon_delete_post);

// GET request to update weapon.
router.get("/weapon/:id/update", weapon_controller.weapon_update_get);

// POST request to update weapon.
router.post("/weapon/:id/update", weapon_controller.weapon_update_post);

// GET request for one weapon.
router.get("/weapon/:id", weapon_controller.weapon_detail);

// GET request for list of all weapon items.
router.get("/weapons", weapon_controller.weapon_list);

/// Aid ROUTES ///

// GET request for creating aid. NOTE This must come before route for id (i.e. display aid).
router.get("/aid/create", aid_controller.aid_create_get);

// POST request for creating aid.
router.post("/aid/create", aid_controller.aid_create_post);

// GET request to delete aid.
router.get("/aid/:id/delete", aid_controller.aid_delete_get);

// POST request to delete aid.
router.post("/aid/:id/delete", aid_controller.aid_delete_post);

// GET request to update aid.
router.get("/aid/:id/update", aid_controller.aid_update_get);

// POST request to update aid.
router.post("/aid/:id/update", aid_controller.aid_update_post);

// GET request for one aid.
router.get("/aid/:id", aid_controller.aid_detail);

// GET request for list of all aids.
router.get("/aid", aid_controller.aid_list);

/// Category ROUTES ///

// GET request for one category.
router.get("/category/:id", category_controller.category_detail);

// GET request for list of all category.
router.get("/categories", category_controller.category_list);

/// Armor ROUTES ///

// GET request for creating an armor. NOTE This must come before routes that display armor (uses id).
router.get("/armor/create", armor_controller.armor_create_get);

// POST request for creating armor.
router.post("/armor/create", armor_controller.armor_create_post);

// GET request to delete armor.
router.get("/armor/:id/delete", armor_controller.armor_delete_get);

// POST request to delete armor.
router.post("/armor/:id/delete", armor_controller.armor_delete_post);

// GET request to update armor.
router.get("/armor/:id/update", armor_controller.armor_update_get);

// POST request to update armor.
router.post("/armor/:id/update", armor_controller.armor_update_post);

// GET request for one armor.
router.get("/armor/:id", armor_controller.armor_detail);

// GET request for list of all armor items.
router.get("/armor", armor_controller.armor_list);

//Misc

// GET request for creating a new misc item. NOTE This must come before routes that display misc items (uses id).
router.get("/misc/create", misc_controller.misc_create_get);

// POST request for creating misc.
router.post("/misc/create", misc_controller.misc_create_post);

// GET request to delete misc.
router.get("/misc/:id/delete", misc_controller.misc_delete_get);

// POST request to delete misc.
router.post("/misc/:id/delete", misc_controller.misc_delete_post);

// GET request to update misc.
router.get("/misc/:id/update", misc_controller.misc_update_get);

// POST request to update misc.
router.post("/misc/:id/update", misc_controller.misc_update_post);

// GET request for one misc.
router.get("/misc/:id", misc_controller.misc_detail);

// GET request for list of all misc items.
router.get("/misc", misc_controller.misc_list);

module.exports = router;
