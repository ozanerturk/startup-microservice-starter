const errorOccured = require("../../events/errorOccured");

module.exports = class BaseEventConsumer {

    consumerName = "";
    exchangeName = "";
    publishErrorEvent = true;
    channel;
    constructor(channel) {
        this.channel = channel;
    }
    queueName() {
        return `${this.consumerName}`;
    }
    async handle(msg) {
    }
    async error(error, msg) {

    }
    async stringifyError(err, filter, space) {
        var plainObject = {};
        Object.getOwnPropertyNames(err).forEach(function (key) {
            plainObject[key] = err[key];
        });
        return JSON.stringify(plainObject, filter, space);
    };
    tryToParseJson(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            return jsonString;
        }
    }
    async register() {

        await this.channel.assertExchange(this.exchangeName, 'fanout');
        const q = await this.channel.assertQueue(this.queueName(), { durable: true });//create unqiue queue for event and delete it self after connection is dropped
        this.channel.bindQueue(q.queue, this.exchangeName, "");//binding queue to event exchange with no routing pattern
        console.log("[x]MQ Bind", "Queue:", q.queue, "Exchange:", this.exchangeName);

        this.channel.consume(q.queue, async (msg) => {
            if (msg !== null) {
                try {
                    console.log(" [x] Event Recieved consumer:%s", this.consumerName);
                    await this.handle(msg.content.toString());
                    console.log(" [x] Event  Handled consumer:%s", this.consumerName);

                } catch (e) {
                    //todo error policy
                    if (this.publishErrorEvent === true) {
                        await errorOccured.publish(this.channel, {
                            event: {
                                exchange: msg.fields.exchange,
                                content: this.tryToParseJson(msg.content.toString())
                            },
                            consumer: this.consumerName,
                            error: {
                                message: e.message,
                                stack: e.stack,
                                simple: e.toString()
                            }
                        });
                    }

                    await this.error(e, msg);
                }
                finally {
                    this.channel.ack(msg);
                }
            }
        });
        console.log(this.consumerName + " registered");
    }
};

