import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if(err) throw err;
})

app.get('/getRepoList', (req, res) => {

})

app.post('/saveInvestorData', (req, res) => {

})