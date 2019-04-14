// Assuming you have already done "npm install fernet"
const Fernet = require('fernet');

const secret = new Fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=');
// Oh no! The code is going over the edge! What are you going to do?
const message = 'gAAAAABcoLJq-xWq4R6c7tCOLmzVlgLSPyp0RgFOQKW_QqgOB-BKX6cXp8qiM181o5QXQ-YQXqM2oz2qFuenweCp_AJhAoqmVvQzoezoeLLmJrdj-9qMGcpcdDnQE_iHE4E-GUo5alSyrOUEqWcE75P5xwCN0F5nDAejggsIi6DHWp-R6pTuQwH3YIU93vwCP71-JsfX1m5R';
const token = new Fernet.Token({ secret, token: message, ttl: 0 });
const decode = token.decode();
console.log(decode);
