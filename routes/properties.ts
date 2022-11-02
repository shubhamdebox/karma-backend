import express, { Router } from "express"
import { loadPropertiesActiveUnderContract,loadPropertiesActive,loadPropertiesComingSoon,fetchProperties, fetchById, fetchByProperties } from "../controllers/properties"
import { contactDetails } from "../controllers/contact";
import { meetingDetails } from "../controllers/meeting";
import { userLogin, userSignup ,getUser,addHouse ,removeHouse , getlikedhouses ,  } from "../controllers/Usercontroller";
import { fetchuser } from "../middleware/fetchuser";
const router = express.Router()

router.get('/loadPropertiesActiveUnderContract',loadPropertiesActiveUnderContract);
router.get('/loadPropertiesActive',loadPropertiesActive);
router.get('/loadPropertiesComingSoon',loadPropertiesComingSoon);
router.post('/fetchProperties',fetchProperties);
router.post('/fetchById/:id',fetchById);
router.post('/fetchByProperties/:page',fetchByProperties);
router.post('/contact',fetchuser,contactDetails);
router.post('/Signup',userSignup);
router.post('/Login',userLogin);
router.post('/meeting',fetchuser,meetingDetails);
router.post('/getuser',fetchuser,getUser);
router.post('/addHouse',fetchuser,addHouse);
router.post('/removeHouse',fetchuser,removeHouse);
router.post('/getlikedhouses',fetchuser,getlikedhouses);


export = router;
