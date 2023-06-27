const steaminventory = require('get-steam-inventory')

const steamid = '76561198148383743';
steaminventory.getinventory(730, steamid, '2', true).then(data => {
    console.log(data.marketnames);
}).catch(err => console.log(err));
