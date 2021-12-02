const data = require('./data.json');
const builder = require('xmlbuilder');
const _ = require('lodash');
const fs = require('fs');

const genSitemap = (domain, dataBody, key) => {
        const root = builder.create('urlset');
        root.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        root.att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        root.att('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

        data[`${dataBody}`].forEach(value => {
                    var item = root.ele('url');
                    item.ele('loc', `https://${domain}/${value[`${key}`]}`);
        item.ele('changefreq', 'daily');
    });

    const xml = root.end({ pretty: true });

    console.log(xml);

    fs.writeFile('./sitemap.xml', xml, (err) => {
        console.log('errr', err)
    });
};

const pArgv = process.argv.slice(2);
genSitemap(pArgv[0], pArgv[1], pArgv[2]);