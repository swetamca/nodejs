const mysql=require('mysql2');
const express=require('express');
var app=express();
const parser=require('body-parser');
app.use(parser.json());
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Abcd@12345678',
    database:'eventsys'
});
connection.connect((err)=>
{
    if(!err) 
    console.log('DB connected');
    else
    console.log('Error');
})
app.listen(5700,()=>console.log('server started...'));
app.get('/eventinformation',(req,res)=>
{
    connection.query('SELECT * FROM events',(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/eventinformation/:event_name',(req,res)=>
{
    connection.query('SELECT * FROM events WHERE event_name=?',[req.params.event_name],(err,rows,fields)=>
    {
        if(!err)
        res.send(rows);
        else
        console.log("error");
    })
})
app.get('/add',(req,res)=>
{
    var post={e_id:123,event_name:'hiking',price:2000,no_of_tickets:2,description:'best',medium_id:1};
    var sql='INSERT INTO events SET ?';
    var query=connection.query(sql,post,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Rows...");
    })
});

app.get('/update/:event_name',(req,res)=>
{
    var name1=2500
    var sql=`UPDATE events SET price='${name1}' WHERE event_name= '${req.params.event_name}'`;
    var query=connection.query(sql,(err,result)=>
    {
        if (err) throw err;
        res.send("Inserted Updated...");
    })
});