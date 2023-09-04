const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = 'a10fac2bb04bd711ecfc2d7fd8547fe25da811ce6908be36b51de38587fb1b5b';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const {name, proof} = req.body;
  // TODO: prove that a name is in the list 
  // verify proof against the Merkle Root
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT); 
  
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
