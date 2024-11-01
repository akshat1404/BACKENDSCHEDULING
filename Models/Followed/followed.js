const mongoose=require('mongoose');
const Schema=mongoose.Schema;

module.exports=mongoose.model('Followed',new Schema({
    email:{type:Schema.Types.ObjectId,ref:'User'},
    followed_id:{type:Schema.Types.ObjectId,ref:'User'}
}))