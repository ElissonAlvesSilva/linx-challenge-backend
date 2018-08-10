'use strict';

const fs = require('fs');
module.exports.page = (req, res) => {
    res.writeHead(200);
    res.end(fs.readFileSync(`${__dirname}/../public/view/index.html`));
};


