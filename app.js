const express = require("express");
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const _=require("lodash");
const app = express();


//data base
mongoose.connect('mongodb://localhost:27017/TODO', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const { MongoClient, ObjectID } = require('mongodb'); 
//item
  const itemSchema={
    name:String
  };
    const Item=mongoose.model('Item',itemSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
//items
const item1=new Item({
  name:"welcome to the to do list"
});
const item2=new Item({
  name:"Hit + button to add items"
});
const item3=new Item({
  name:"Press the checkbox to delete"
});
let defitem=[item1,item2,item3];
//insertion 
const list_schema={
  name:String,
  items:[itemSchema]
};
const Listed=mongoose.model("Listed",list_schema);

// Item.insertMany(defitem,function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Success");
//   }
// });
//


app.get("/", function(req, res) {

const day = date.getDate();
Item.find({},function(err,docs){
  if(docs.length===0){
    Item.insertMany(defitem,function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log("Success");
      }
    });
    res.redirect("/");//redirecting to the root route

  }
  else{
    res.render("list", {listTitle: "Today", newListItems: docs});
  }
  
    
  
});

  

});
app.get("/:custom_name",function(req,res){
  var list_name=_.capitalize(req.params.custom_name)  ;
  
  
  Listed.findOne({name:list_name},function(err,docs){
   if(!docs){
     //new list
     const list=new Listed({
      name:list_name,
      items:defitem
    });
list.save();  
res.redirect("/:custom_name");
   }
   else{
     //
     res.render("list", {listTitle: docs.name, newListItems:docs.items});
   }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName= req.body.list;


  const newItem=new Item({
    name:itemName 
  });
  if(listName=="Today"){
    newItem.save();
    res.redirect("/");
  
    
  }
  else{
    Listed.findOne({name:listName},function(err,docs){
     
      docs.items.push(newItem);
      docs.save();
      res.redirect("/"+listName);
      
    });

  }
  

  
});
app.post("/delete",function(req,res){
  let check=req.body.checkbox;
  let ListName=req.body.listname;
  console.log(ListName);
  if(ListName==="Today"){
    Item.findByIdAndRemove(check,function(err){
      if(err){
        console.log("error");
  
      }
      else{
        console.log("success");
        res.redirect("/");
      }});
    }
    else{
      Listed.findOneAndUpdate({
name:ListName
      },{$pull:{items:{_id: new ObjectID(check)}}},function(err,docs){//removing the item that matches with the id condition
        if(!err){
          res.redirect("/"+ ListName); 
        }
      
      });
      
    }
    });
 
  
 





app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
