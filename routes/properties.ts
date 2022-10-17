import express from "express"
import { loadPropertiesActiveUnderContract,loadPropertiesActive,loadPropertiesComingSoon,fetchProperties, fetchById, fetchByProperties} from "../controllers/properties"

const router = express.Router()

router.get('/loadPropertiesActiveUnderContract',loadPropertiesActiveUnderContract);
router.get('/loadPropertiesActive',loadPropertiesActive);
router.get('/loadPropertiesComingSoon',loadPropertiesComingSoon);
router.post('/fetchProperties',fetchProperties);
router.post('/fetchById/:id',fetchById);
router.post('/fetchByProperties/:page',fetchByProperties);

export = router;