const mongoose = require('mongoose');
const dns = require('node:dns');

require('dotenv').config();

const dnsServers = process.env.DNS_SERVERS
    ?.split(',')
    .map((server) => server.trim())
    .filter(Boolean);

if (dnsServers?.length) {
    dns.setServers(dnsServers);
}

exports.dbConnect=async( req, res)=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Successfully connected to the database")
    })
    .catch((error)=>{
        console.log(error)
        console.error(error)
        console.log("Error connecting to the database")
        process.exit(1);
    })
}