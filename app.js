const express=require("express");
const app=express();
const date=require(__dirname+"/views/date.js");

const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
var itemi=[];
var work_items=[];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    var today=date.date();
    res.render('list2', {title_list:today,
    itemsi:itemi});
    
    

});
app.post("/",function(req,res){
   var items=req.body.add_item;
   
   if(req.body.list_button==="Work"){
       work_items.push(items);
       res.redirect("/work");
   }
   else{
    itemi.push(items);
    res.redirect("/");
   }
    
    
});
app.get("/work",function(req,res){
    res.render("list2",{
        title_list:"Work List",
        itemsi: work_items
    });
});
app.post("/work",function(req,res){
    let item=req.body.add_item;
    work_items.push(item);
    res.redirect("/work");
});
app.get("/about",function(req,res){
    res.render("about");
})
app.listen(3000,function(){
    console.log("server listening through 3000");
});
// app.get("/experiment",function(req,res){
//     res.render("experiment");
// 