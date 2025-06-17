const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json({ limit: '10kb' }));

app.post('/storage', (req, res) => {

    const dataStr = fs.readFileSync('./data.json', 'utf-8');

    const data = JSON.parse(dataStr);

    console.log(req.body);

    data[`${req.body.reservationDraftId}`] = req.body.formState;

    fs.writeFileSync('./data.json', JSON.stringify(data));

    res.json({message: 'Saved'})

})

app.get('/storage/', (req, res) => {

    const dataStr = fs.readFileSync('./data.json', 'utf-8');

    const data = JSON.parse(dataStr);

    return res.json(data);

})

app.get('/storage/:reservationDraftId', (req, res) => {

     const dataStr = fs.readFileSync('./data.json', 'utf-8');

    const data = JSON.parse(dataStr);

    const formState = data[req.params.reservationDraftId];

    return res.json(formState);

})

app.post('/reset', (req, res) => {

    fs.writeFileSync('./data.json', JSON.stringify({}));

    return res.json({message: 'Reseted'})
})

 app.listen(4000, () => {
  console.log(`App running on port ${4000}...`);
});
