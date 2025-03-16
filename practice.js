import express from "express"


const hello = app.get('/hello',(req,res)=>{
    console.log('hello there');
    res.send(hello);
})