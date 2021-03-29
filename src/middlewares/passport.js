//如何抓取用戶  使用middlewares抓取
import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserService from '../services/user';

passport.use(new LocalStrategy({
    usernameFild: 'email',
},(async(email,password,cd)=>{
    const user=await UserService.getUser(email);
    if(!user){
        return cd({status: 400, message: 'no found'},false);
    }
    return cd(null, user);
}
)));

export default passport;