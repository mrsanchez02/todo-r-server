const {generate} = require("short-id");
const express = require("express");
const app = express();

// Express Body Parser
app.use(express.json());

// port
const PORT = 3001;

// db
let ToDo = [
	{"id":1,"title":"Practice Backend","completed":false},
	{"id":2,"title":"Practice Front End","completed":false}
];

app.get("/",(req,res)=>{
	res.json({"Status":"Exitosa"}).statusCode(200);
});

// Get All ToDos
app.get("/api/todo",(req,res)=>{
	res.json(ToDo);
});

// Get one ToDo
app.get("/api/todo/:id", (req,res)=> {
	const id = Number(req.params.id);
	const todo = ToDo.find(t=>t.id===id);
	if(todo){
		res.json(todo);
	} else {
		res.status(404).end();
	}
});

// Delete one ToDo
app.delete("/api/todo/:id", (req,res)=>{
	const id = Number(req.params.id);
	let toDel = ToDo.find(t=>t.id===id);
	console.log(toDel);
	if(typeof(toDel)==="undefined"){
		res.status(404).end();
	} else {
		ToDo = ToDo.filter(t=>t.id!==id);
		res.json({"msg":"Todo Deleted"});
	}
});

// Post one ToDo
app.post("/api/todo",(req,res)=>{
	const todoBody = req.body;
	if(todoBody.title.trim()==="") return res.status(204).end();
	const newTodo = {
		id:generate(),
		title:todoBody.title,
		completed: todoBody.completed || false
	};
	ToDo = [...ToDo, newTodo];
	res.json(newTodo);
});

// Running server...
app.listen(PORT, ()=>{
	console.log(`Server running on port ${PORT}`);
});
