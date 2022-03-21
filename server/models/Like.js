const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   communityId: {
       type: Schema.Types.ObjectId,
       ref: 'Community'
   }

}, { timestamps: true })


const Like = mongoose.model('Like', likeSchema);

module.exports = { Like }