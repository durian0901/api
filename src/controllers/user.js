import models from "../models/index";
import _ from 'lodash';
import sequelize from 'sequelize';
import {brotliDecompressSync} from 'zlib';
import UserService from '../services/user';

const {users} = models

//須改未改
class UserConstroller{
    //create
    getUser =async(req,res) =>{
        const {email} =req.body;
        const user = await users.findOne({
            where:{
                email
            }
        });

        // const respone = _.map(user,(o)=>({
        //     ...o.dataValues,
        //     vip:true,
        // }));

         res.status(200).json({user})
    };

    //search
    //找尋email的部分丟到services處理
    
    // getUser =async(req,res)=>{
    //     const {id} =req.parms;
    //     const user =await UserService.postUser(email);
    //     res.status(200).json({user});
    // };
    // getToken =async(req,res)=>{
    //     const {id}=req.params;
    //     const token =await UserService.getToken(email);
    //     res.status(200).json({user});
    // }

    postUser = async(req,res) =>{
        const{body}=req;
        const{email,password} = body
        const user =await users.create({
            email,
            password
        });
        res.status(200).json({user});
    };
    //Delete

    postDelete= async(req,res)=>{
        const{body}=req
        const{email}=body
        //抓Email刪除
        const user=await users.destroy({  
            where:{
                email
            }
        })
        res.status(200).json({user});
    };

    //update


    patchUpdate= async(req,res)=>{
        const{body}=req
        const{email,password}=body
        const user=await users.update({  
            //更改的資料
            password:password},{
                //抓位置
            where:{
                email
            }
        })
        res.status(200).json({user});
    };
}

export default new UserConstroller();



//?