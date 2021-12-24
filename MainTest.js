const bodyParser = require('body-parser');
const express = require('express');
const CircuitDao = require("./dao/circuitDao");
const ClrEntryDao = require("./dao/clrEntryDao");
const http = require('http');
const fs = require('fs');
const url = require('url');

const circuitDao = new CircuitDao();
const clrEntryDao = new ClrEntryDao();


const testDao = async () => {

    //result = await circuitDao.getBranchesByCircuitName("6FDDZ318345000ABGT");
    //console.log("Result --> ", result)
    //result = await circuitDao.getBranchesByCircuitName("6PADT267425000ABGT");
    //console.log("Result --> ", result)
    //result = await circuitDao.getBranchesByCircuitName("NXFDDA838779000ABGT");
    //console.log("Result --> ", result)

}

//testDao();


const webapp = express();
const port = 5000;


webapp.get('/api/getBranchesByCircuitName', async (req, res) => {
    var q = url.parse(req.url, true);
    console.log(q.pathname);
    console.log(q.query.circuitName); //returns circuitName : '6FDDZ318345000ABGT'
    let result = await circuitDao.getBranchesByCircuitName(q.query.circuitName);    
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
});

webapp.get('/api/getClrReportByBranch', async (req, res) => {
    var q = url.parse(req.url, true);
    console.log(q.pathname);
    let result = await clrEntryDao.getClrEntiresByBranch(q.query);    
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
});

webapp.post('/api/world', (req, res) => {
    res.send(
        'I received your POST request. '
    );
});

const initialIssues = [
    {
      id: 1, status: 'New', owner: 'Ravan', effort: 5,
      created: new Date('2018-08-15'), due: undefined,
      title: 'Error in console when clicking Add',
    },
    {
      id: 2, status: 'Assigned', owner: 'Eddie', effort: 14,
      created: new Date('2018-08-16'), due: new Date('2018-08-30'),
      title: 'Missing bottom border on panel',
    },
];

webapp.get('/api/issues', async (req, res) => {
    var q = url.parse(req.url, true);
    console.log(q.pathname);
    console.log(JSON.stringify(initialIssues));
    res.send(JSON.stringify(initialIssues));
});

webapp.listen(port, () => console.log('Listening at port:' + port));

