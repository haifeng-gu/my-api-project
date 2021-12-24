const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const fs = require('fs');
const url = require('url');
const webapp = express();
const port = 5000;

webapp.use(bodyParser.urlencoded({ extended: false }));
webapp.use(bodyParser.json());


webapp.post('/api/world', (req, res) => {
    res.send(
        'I received your POST request. '
    );
});

const issueData = [
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

const getMaxId =  () => {
    var id = 1;
    for(var i = 0; i < issueData.length; i++) {
        if(issueData[i].id > id) {
            id = issueData[i].id;
        }
    }    
    return id;
}

webapp.put('/api/issues', async (req, res) => {
    // var issue= {
    //     id: req.body.id, status: req.body.status, owner: req.body.owner, effort: req.body.effort,
    //     created: new Date(req.body.created), due: new Date(req.body.due),
    //     title: req.body.title
    //   };
    console.log('req.body=' + JSON.stringify(req.body));
    var id = req.body.id;
    for(var i = 0; i < issueData.length; i++) {
        if(issueData[i].id == id) {
            issueData.splice(i, 1);
            break;
        }
    }
    var issue = req.body;
    issueData.push(issue);
    console.log(JSON.stringify(issueData));
    res.send(JSON.stringify(issueData));

});


webapp.post('/api/issues', async (req, res) => {
    // var issue= {
    //     id: req.body.id, status: req.body.status, owner: req.body.owner, effort: req.body.effort,
    //     created: new Date(req.body.created), due: new Date(req.body.due),
    //     title: req.body.title
    //   };
    console.log('req.body=' + JSON.stringify(req.body));
    var issue = req.body;
    issue.id = getMaxId(issueData) + 1;
    issueData.push(issue);
    res.send(JSON.stringify(issueData));
});

webapp.get('/api/issues/:id', async (req, res) => {
    var id = req.params.id;
    for(var i = 0; i < issueData.length; i++) {
        if(issueData[i].id == id) {
            console.log(JSON.stringify(issueData[i]));
            res.send(JSON.stringify(issueData[i]));
            break;
        }
    }    
});

webapp.get('/api/issues', async (req, res) => {
    console.log(JSON.stringify(issueData));
    res.send(JSON.stringify(issueData));
});

webapp.delete('/api/issues/:id', async (req, res) => {
    var id = req.params.id;
    for(var i = 0; i < issueData.length; i++) {
        if(issueData[i].id == id) {
            issueData.splice(i, 1);
            break;
        }
    }
    console.log(JSON.stringify(issueData));
    res.send(JSON.stringify(issueData));
});

webapp.listen(port, () => console.log('Listening at port:' + port));

