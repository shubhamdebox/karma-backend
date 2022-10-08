import express from "express"
import { loadProperties,fetchProperties, fetchById, fetchByProperties} from "../controllers/properties"

const router = express.Router()

router.get('/loadProperties',loadProperties);
router.post('/fetchProperties',fetchProperties);
router.post('/fetchById',fetchById);
router.get('/fetchByProperties',fetchByProperties);

export = router;