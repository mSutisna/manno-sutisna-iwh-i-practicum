const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-eu1-27751a18-34e2-4f50-a561-e8c505ac0579';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

app.get('/', async (req, res) => {
    const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/pets?properties=name,type,age';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(petsEndpoint, { headers });
        const data = resp.data.results;

        res.render('index', { title: 'Index | Integrating With HubSpot I Practicum', data});

    } catch (error) {
        console.error(error);
    }
});

app.get('/update-cobj', async (req, res) => {
    res.render('update', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'});
});

app.post('/update-cobj', async (req, res) => {
    const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/pets';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json',
    }
    const properties = {
        name: req.body.Name,
        type: req.body.type,
        age: req.body.age
    }
    try {
        await axios
            .post(petsEndpoint, { properties }, {headers})
            .then(() => res.redirect("/"));
    } catch (e) {
        console.error(e);
    }
});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));