const Message = require('../models/message.model');

class messageDao{

    find = async()=>{
        try {
            const response = await Message.find().lean()
            return response
        }
        catch (error) {
            return error
        }
    }   

    create = async (obj)=>{
        
        try {
            const response = await Message.create(obj);
            return response
        }
        catch (error) {
            return error
        }

    }


    findOne = async(_id) => {
        const filter = { "_id": _id };
        try {
            const response = await Message.findOne(filter).lean();
            return response
        }
        catch (error) {
            return error
        }
    }


    deleteOne = async(_id) =>{
        const filter = { "_id": _id };
        try {
            const response = await Message.deleteOne(filter)
            return response
        }
        catch (error) {
            return error
        }
    }


    updateOne = async (obj) =>{
    
        const {_id,...rest} = obj;
        const filter = { "_id": _id}
        
        try {
            const response = await Message.updateOne(filter,rest).lean()
            return response
        }
        catch (error) {
            return error
        }     

    }

    save = async ()=>{
        
        try {
            const response = await Message.save();
            return response
        }
        catch (error) {
            return error
        }
    }

}




//-------------------- Exportamos  -------------------- //

module.exports =  messageDao