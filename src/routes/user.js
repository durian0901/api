import {Router} from 'express';
import UserConstroller from '../controllers/user'
import UserMiddleware from '../middlewares/user'

const router =Router();

//GET: api/user
router.get('/',UserConstroller.getUser);

//post: /api/user/find
router.post('/',UserConstroller.postUser);
router.post('/find',UserMiddleware.Authenticate);
router.delete('/',UserConstroller.postDelete);
router.patch('/',UserConstroller.patchUpdate);

export default router;