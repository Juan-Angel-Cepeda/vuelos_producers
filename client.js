const {Kafka} = require('kafkajs');

const kafka_conection = new Kafka({
    clientId:'my-app',
    brokers:['3.16.57.3:9092']
})

module.exports = kafka_conection
