var express = require('express');
var app = express();
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cloudinary = require("cloudinary").v2;
const confing = require("./config/key")
const { Photocard } = require("./models/Photocard");
const { Community } = require("./models/Community");
const {Comment} =require("./models/Comment")
const path = require("path");

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser())
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요!")
})

const mongoose = require("mongoose");
const connect = mongoose.connect(confing.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/users', require('./routes/users'));

app.post('/api/photocard', (req, res)=>{
  //받아온 정보들을 DB에 넣어준다
  const photocard = new Photocard(req.body)
  photocard.save((err)=>{
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })

  console.log(req.body)
})

app.post('/api/photocard/album', (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 8;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm

  if (term === undefined || term === null) {
    Photocard
      .find({ writer: req.body.userId })
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      })
    
  } else {
    Photocard
      .find({ date: new RegExp(term) })
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      })
  }
})

app.post('/api/photocard/image/delete', (req, res) => {
  cloudinary.config({
    cloud_name: confing.cloudName,
    api_key: confing.apiKey,
    api_secret: confing.apiSecret
  });

  let deleteImg = req.body
  cloudinary.uploader.destroy(deleteImg.public_id, function (error, result) {
    console.log(result, error)
  });
})

app.get('/api/photocard/delete_id', (req, res)=>{
  let productId = req.query.id
  console.log(productId)

  Photocard.findOneAndDelete(
    { _id: productId},
    { new: true },
    (err) => {
      if (err) return res.status(200).json({ success: false, err })
      res.status(200).send({success:true})
    }
  )
})

app.post('/api/photocard/image', (req, res) =>{
  cloudinary.config({
    cloud_name: confing.cloudName,
    api_key: confing.apiKey,
    api_secret: confing.apiSecret
  });

  cloudinary.uploader.upload(req.body.can, { folder: "IMG/Photocard/"})
  .then(result =>{
    return res.json({success:true, result:{url:result.url, public_id:result.public_id}})
  });
})

app.get('/api/select/select_by_id', (req, res) => {
  const select = req.query.id

  cloudinary.config({
    cloud_name: confing.cloudName,
    api_key: confing.apiKey,
    api_secret: confing.apiSecret
  });
   
   cloudinary.search.expression(
     `folder:IMG/${select}/*` // add your folder
     ).sort_by('public_id','desc').execute()
     .then(result=>{
      return res.json({success:true, result:result.resources.map(e=>(e.url))})
     });
})

app.post('/api/community', (req, res)=>{
  let limit = req.body.limit ? parseInt(req.body.limit) : 7;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm==="" ? null : req.body.searchTerm;
  let selection = req.body.selection==="" ? null : req.body.selection

  if (term === undefined || term === null) {
    Community
      .find({})
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      })
  } else {
    Community
      .where(selection)
      .equals(new RegExp(term))
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length })
      })
  }
})

app.post('/api/community/count', (req, res) => {
  let term = req.body.term
  let selection = req.body.selection
  if (term === undefined || term === null) {
    Community.countDocuments({}, function (err, count) {
      if(err) return res.status(400).json({success:false, err})
      return res.status(200).json({success:true, counts:count})
    })
  }else{
    Community.where(selection).equals(new RegExp(term)).countDocuments().exec(function (err, count) {
      if(err) return res.status(400).json({success:false, err})
      return res.status(200).json({success:true, counts:count})
    })
  }
})

app.post('/api/community/upload',(req, res) =>{
  const community = new Community(req.body)
  community.save((err)=>{
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })

  console.log(req.body)
})

app.post('/api/community/upload',(req, res) =>{
  const community = new Community(req.body)
  community.save((err)=>{
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })

  console.log(req.body)
})

app.get('/api/community/delete_by_id', (req, res)=>{
  let communityId = req.query.id
  console.log(communityId)

  Community.findOneAndDelete(
    { _id: communityId},
    { new: true },
    (err) => {
      if (err) return res.status(200).json({ success: false, err })
      res.status(200).send({success:true})
    }
  )
})

app.get('/api/community/community_by_id', (req, res)=>{
  let productId = req.query.id

  Community.find({_id : productId})
  .exec((err,product) =>{
    if(err) return res.status(400).send(err)
    return res.status(200).send(product)
  })
})

app.post('/api/comment/saveComment', (req, res) => {
  const comment = new Comment(req.body)

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err })
    Comment.find({ '_id': comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true, result })
      })
  })
})

app.get('/api/comment/getComments',(req, res)=>{
  let commentId = req.query.id

  Comment.find({postId:commentId})
  .populate("writer")
  .exec((err,comment)=>{
    if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true, comment })
  })
})

if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}