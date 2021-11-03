import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if(err) throw err;
})

app.get('/getRepoList', async (req, res) => {
    const response = await fetch('https://api.github.com/orgs/alibaba/repos?per_page=200');
    const data = await response.json();

    await res.send(data)
})

app.post('/saveInvestorData', (req, res) => {

})