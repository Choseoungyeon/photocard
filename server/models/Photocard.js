const mongoose = require('mongoose');
const Schema = mongoose.Schema

const photocardSchema = mongoose.Schema({
    writer:{
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    images:{
        type:Object,
        default:{}
    },
    date:{
        type:String,
        default:''
    }
})

const Photocard = mongoose.model('Photocard', photocardSchema)

module.exports={Photocard}