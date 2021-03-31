//中介層
//掌管登入情況
//import user from '../services/user';
import passport from './passport';
import jwt from 'jsonwebtoken';

class UserMiddleware{
   //解密
        decodeToken = (token) =>{
            try{
                return jwt.verify(data, process.env.APP_KEY)
            }catch(error){
                return false;
            }
        }

    //驗證
    //middlewares/passport.js  passport.use
    Authenticate =(req,res,next)=>{
        //passport的驗證方法    'haha'  
        passport.authenticate('local',{session: false}, async(err,user)=>{
            //處理錯誤訊息
            if(err){
                const {status, message} =err;
                res.status(status).json({message});
                return;
            }
            // if(!user){
            //     res.status(401).json({message:'登入失敗 -false log in'});
            // }
            const data ={
                id:user.id,
                //幾分鐘  1分鐘
                expireTime:new Date().getTime()+1*60*1000
            }
            const token = jwt.sign(data, process.env.APP_KEY,)
            res.status(200).json({message:'登入成功-sucess log in',token:token});
            
        //代表下面還有其他層  參考官方文件:)
        })(req,res,next);  
    }
    jwtAuthenticate = async(req,res,next)=>{
        passport.authenticate('jwt',{session:false},(err,user,info)=>{
            if(info){
                res.status(401).json({message:'尚未登入'})
                return;
            }
            if(err){
                const {status,message}=err;
                res.status(status).json({message})
                return;
            }
            const {id}=user;
            req.id=id;
            next();
        })(req,res,next)
    }
}

export default new UserMiddleware();