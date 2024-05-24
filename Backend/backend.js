const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

let personData1 = [];
  


// Use CORS middleware
app.use(cors());
app.use(express.json())


app.get('/todos/get-list', (req, res) => {

  res.send(personData1)


})



app.post('/todos/add-todo', (req, res) => {

  req.body.id =Math.random() 
  personData1.push(req.body);



 // console.log(personData1, '<<<<<<<<<--- personData1');
  res.status(200).json(personData1) //send(personData)


})

app.put('/todos/edit-todo', (req, res) => {

 
  let textValue = req.body

  const id = textValue.id;
  const newValue = textValue.valueText;

  const index = findUserIndexById(id);

  personData1[index].valueText = newValue;

  //console.log(personData1, '<<<<<<<<<--- editData1');
  res.status(200).json(personData1) //send(personData)


})

app.put('/todos/check-todo', (req, res) => {

 
  let textValue = req.body
  const id = textValue.id;
  const newCheck= textValue.check;

  const index = findUserIndexById(id);

  personData1[index].check = newCheck;

  //console.log(personData1[index].id, '<<<<<<<<<--- checkData1');
  res.status(200).json(personData1) //send(personData)


})

app.delete('/todos/del-todo', (req, res) => {

 
  let textValue = req.body
  const id = textValue.id;
  console.log(textValue)

  const index = findUserIndexById(id);
  console.log(index)

  personData1.splice(index, 1)

  //console.log(personData1, '<<<<<<<<<--- delData1');
  res.status(200).json(personData1) //send(personData)


})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function findUserIndexById(id){
  for(let i=0; i < personData1.length; i++){
      if(personData1[i].id==id) return i;
  }
}