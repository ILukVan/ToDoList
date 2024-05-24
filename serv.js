const express = require('express')
const app = express()
const port = 3000
let a = [1, "dva"]

app.get('/', (req, res) => {

  res.send('Hello World!')
  res.send(a);
  res.writeHead(200, {'Content-Type': 'application/json'});
  //res.end(JSON.stringify(
 //   [{"value":"1","zListClass":"","zSpanClass":""},{"value":"2","zListClass":"","zSpanClass":""},{"value":"3","zListClass":"false","zSpanClass":"false"},{"value":"9g","zListClass":"","zSpanClass":""},{"value":"git","zListClass":"","zSpanClass":""}]
 // ));

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})