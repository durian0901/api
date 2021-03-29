//import user from '../services/user';
import passport from './passport';

class UserMiddleware{
    //驗證
    Authenticate =(req,res,next)=>{
        //passport的驗證方法
        passport.authenticate('local',{session: false}, async(err,user)=>{
            //啥??
            if(error){
                const {status, message} =error;
                res.status(status).json({message});
                return;
            }
            if(!user){
                res.status(400).json({message:'false log in'});
            }
            res.status(200).json({message:'sucess log in'});
            
        //執行完此程式會立刻執行下個動作
        })(req,res,next);  
    }
}

export default new UserMiddleware();