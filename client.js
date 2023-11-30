const {Kafka} = require('kafkajs');

const kafka_conection = new Kafka({
    clientId:'my-app',
    brokers:['localhost:9092']
})

module.exports = kafka_conection
