import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
    if(err) throw err;
})

app.get('/getRepoList', async (req, res) => {
    const response = await fetch('https://api.github.com/orgs/alibaba/repos?per_page=200');
    const data = await response.json();
    
    await res.send(data)
})

app.get('/getInvestorsList', (req, res) => {
    fs.readFile('investorsDB.json', (err, file)=> {
        res.send(JSON.parse(file))
    })
})

app.post('/saveInvestorData', (req, res) => {
    const projectID = req.body.projectID;
    const investAmount = req.body.investAmount;
    const investorEmail = req.body.investorEmail;

    let investorsArray = []

    fs.readFile('investorsDB.json', (err, file)=> {
        investorsArray = JSON.parse(file)

        const newInvestorObject = {
            projectID,
            investAmount,
            investorEmail
        }
        
        investorsArray.push(newInvestorObject)
    
        fs.writeFile('investorsDB.json', JSON.stringify(investorsArray), (err) => {
            if(err) throw err;
            res.send('New Investor Added')
        })
    })
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});