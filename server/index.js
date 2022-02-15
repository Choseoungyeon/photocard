var express = require('express');
var app = express();
const port = 5000
const bodyParser = require('body-parser')
const cloudinary = require("cloudinary").v2;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요!")
})

app.get('/api/select/select_by_id', (req, res) => {
  const select = req.query.id

  cloudinary.config({
    cloud_name: "debdoulmp",
    api_key: "772173638964326",
    api_secret: "-GbmTCcdM2NmTnu0V2rmuyZNcbQ"
  });
   
   cloudinary.search.expression(
     `folder:IMG/${select}/*` // add your folder
     ).sort_by('public_id','desc').execute()
     .then(result=>{
      return res.json({success:true, result:result.resources.map(e=>(e.url))})
     });
})