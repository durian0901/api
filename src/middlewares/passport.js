//如何抓取用戶  使用middlewares抓取
import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserService from '../services/user';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt'

require('dotenv').config();
//jwt options
const options ={
    secretOrKey: process.env.APP_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const caleExpireTime =(payload)=>{
    const {expireTime}=payload;
    const currentTime=new Date().getTime();

    if(currentTime>expireTime){
        return false;
    }
    return true;
}


//passport.use('haha',new LocalStrategy)  ---------換名稱對應user
passport.use(new LocalStrategy({
    usernameField: 'email',
    passportField:'password',  //還沒遇到
    //驗證  
},(async(email,password,cd) =>{
    const user=await UserService.getUser(email);
    if(!user){
        return cd({status: 404, message: '找不到該用戶 no find'},false);
    
    }
    //和資料庫比對密碼是否一樣
    if(password !== user.password ){
        return cd({status: 404, message: 'error password 密碼錯誤'},false);
    }

    //return cd(null,true)
    return cd(null, user);
}
)));

passport.use(new JwtStrategy(options,async(payload,cd)=>{
    //expireTime,id
    //驗證
    const status = caleExpireTime(payload);
    if(!status){
        return cd({ status:400,message:'Token 到期  請重新登入'})
    }
    return cd(null,payload);
}))

export default passport;