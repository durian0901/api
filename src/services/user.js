import model from '../models/index';

const {users} =model;

class UserService {
    getUser =async(email)=>{
        const user = await users.findOne({
            where:  {
                email,
            },
        });
        return user
    }
}
    
//原本controllers的部分↑↑

//     const user = await users.findAll();
//     const respone = _.map(user,(o)=>({
//         ...o.dataValues,
//         vip:true,
//     }));


export default new UserService();