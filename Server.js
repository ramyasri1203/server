import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js";

var app=express();
const PORT=3000;
//no one allowed
//app.use(cors());

//only orgin 5173 allowed
// app.use(cors({origin:"http://localhost:5173"}));

//all are allowed
app.use(cors());

app.use(express.json());
 
//mongoose connect
mongoose.connect("mongodb://localhost:27017/Todo").then((res)=>{     //default aa test db la connect  //.then((sri)) ithula name enavena kuduthukala object
    // mongoose.connect("mongodb://localhost:27017/tododb")    // tododb la connect aagum
    // console.log(res);  // if la ulla states ku console check run panna  athula state irukum.


//  mongoose.connect("mongodb+srv://user123:<db_password>@cluster0.z5np3.mongodb.net/Todo")
//  .then((res)=>{   
    if(res.STATES.connected===1){
        console.log(`connected to mongodb ${res.connection.name}`)
    }else{
        console.log("error connecting mongodb")
    }

}).catch((error)=>{console.log(error)});


//create schema or structure
var todoTaskSchema=mongoose.Schema({
    id:Number,
    taskName:String
})
//create model (collection/table)
var todoTaskModel=mongoose.model("todotasks",todoTaskSchema)

//get http://localhost:3000/tasks
app.get("/tasks",(req,res)=>{
    console.log("GET:Task")
    todoTaskModel.find()
    .then((data)=>{res.json(data)})
    .catch((error)=>{
        console.log(error);
        res.json({type:"error",message:error.message});
    });
    // console.log("hello world");
    // res.json({id:1,taskName:"my task1"});
})

//get http://localhost:3000/tasks/1
// app.get("/tasks/:id",(req,res)=>{
//     console.log("req.params.id:",req.params.id)
//     console.log("hello world");
//     res.json({id:1,taskName:"my task1"});
// })


// app.post("/tasks",(req,res)=>{
//     console.log(req.body);
//     res.json({message:"task posted"})
// })

app.post("/tasks", (req, res) => {
    var taskData = req.body;

    if (!taskData.taskName) {
        res.json({ type: "error", message: "enter task" });
    } else {

        var newTask = new todoTaskModel({
            id: Date.now(),
            taskName: taskData.taskName
        });

        newTask.save()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
            res.json({ type: "error", message: error.message });
        });
    }
});  

//put 2
app.put("/tasks/:id",(req,res)=>{
    //req.params.id
    //req.body
    todoTaskModel.findOneAndUpdate({id:req.params.id},req.body,{new:true})
    .then((data)=>{
        res.json(data)
    })
    .catch((error)=>{
        console.log(error);
        res.json({type:"error",message:error.message});
    })
})

//delete 2
app.delete("/tasks/:id",(req,res)=>{
    todoTaskModel.findOneAndDelete({id:req.params.id})
    .then((data)=>{
        console.log(data)
        res.json(data)
    })
    .catch((error)=>{
        console.log(error);
        res.json({type:"error",message:error.message});
    })
})


    
//put  http://localhost:3000/tasks 
// app.post("/tasks/:id",(req,res)=>{
//     console.log("put req.params.id:",req.params.id)
//     res.json({id:1,taskName:"my task1"})


// })

//delete
// app.delete("/tasks/:id",(req,res)=>{
//     console.log("delete req.params.id:",req.params.id)
//     res.json({message:"task deleted"});

// })

//put http://localhost:3000/tasks/1
// app.put("/tasks/:id",(req,res)=>{
// console.log("put req.params.id:",req.params.id)
// res.json({id:1,taskName:"my task1"})
// })


//routing

// app.get("/tasks",(req,res)=>{
    // res.send("hello world hai how are you");
//     res.json({id:1,taskName:"task 1"});
//     console.log("hello world");
// })


// /api/signup
app.use("/api/auth",authRouter)
// app.use("api/todo",todoRouter)


//listener
app.listen(PORT,()=>{
console.log(`server listening on port # ${PORT}`);
}
)