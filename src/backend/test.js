/*const steaminventory = require('get-steam-inventory')

const steamid = '76561198148383743';
steaminventory.getinventory(730, steamid, '2', true).then(data => {
    console.log(data.marketnames);
}).catch(err => console.log(err));


30932881826
http://steamcommunity.com/inventory/76561198148383743/730/2 // working
opt parameters: + '?l=english&count=2000' if go above, will get rate limited
steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198148383743A30932881826D7639311159524325549
ex: steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S%owner_steamid%A%assetid%D7215897460435273119
https://steamcommunity-a.akamaihd.net/economy/image/{icon-url} // to get image
http://steamcommunity.com/profiles/76561198148383743/inventory/json/753/6 working
https://steamcommunity.com/tradeoffer/new/partnerinventory?partner=76561198148383743&appid=730&contextid=2 not working
Additional option: www.steamwebapi.com
https://github.com/csgofloat/inspect for floats
*/