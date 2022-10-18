import express, { Router } from "express"
import { loadPropertiesActiveUnderContract,loadPropertiesActive,loadPropertiesComingSoon,fetchProperties, fetchById, fetchByProperties} from "../controllers/properties"
import { contactDetails } from "../controllers/contact";
import { meetingDetails } from "../controllers/meeting";
import { UserLogin, UserSignup ,GetUser } from "../controllers/Usercontroller";
import { fetchuser } from "../middleware/fetchuser";
const router = express.Router()

router.get('/loadPropertiesActiveUnderContract',loadPropertiesActiveUnderContract);
router.get('/loadPropertiesActive',loadPropertiesActive);
router.get('/loadPropertiesComingSoon',loadPropertiesComingSoon);
router.post('/fetchProperties',fetchProperties);
router.post('/fetchById/:id',fetchById);
router.post('/fetchByProperties/:page',fetchByProperties);
router.post('/contact',contactDetails);
router.post('/meeting',meetingDetails);
router.post('/Signup',UserSignup);
router.post('/Login',UserLogin);
router.post('/getuser',fetchuser,GetUser)

export = router;