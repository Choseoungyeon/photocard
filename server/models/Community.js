const mongoose = require('mongoose');
const Schema = mongoose.Schema

const communitySchema = mongoose.Schema({
    writer:{
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    user:{
        type:String,
        default:''
    },
    images:{
        type:Array,
        default:[]
    },
    date:{
        type:String,
        default: ''
    },
    title:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    }
},{timestamps:true})

const Community = mongoose.model('Community', communitySchema)

module.exports={Community}