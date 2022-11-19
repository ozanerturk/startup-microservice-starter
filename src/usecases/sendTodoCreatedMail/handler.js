const BaseEventConsumer = require("../../infrastructure/amqp/baseEventCosumer");
const todoCreated = require("../../events/todoCreated");
const sendMail = require("./gateways/sendMail");

module.exports = class extends BaseEventConsumer {
    consumerName = "SendTodoCreatedMail";
    exchangeName = todoCreated.eventName;


    async handle(msg) {
        let event = todoCreated.parseAndValidate(msg);

        console.log("SendTodoCreatedMail", event);
        
        sendMail(event);
        
        console.log("mail sent");

    }
    async error(error, msg) {

    }
};