const {Kafka} = require('kafkajs');

const kafka_conection = new Kafka({
    clientId:'my-app',
    brokers:['18.222.175.149:9092']
})

module.exports = kafka_conection
