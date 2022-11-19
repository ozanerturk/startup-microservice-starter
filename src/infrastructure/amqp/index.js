const amqplib= require('amqplib');
 
const resolveHandlers = require('./resolveHandlers');
//connection will be singleton
module.exports = {
    channel: null,
    initialized: false,

    async init({ config }) {
        if (this.initialized) {
            return;
        }
        let connection = await amqplib.connect(config.amqpUrl);

        connection.on("error", (err) => {
            // No need to reject here since close event will be fired after
            // if not connected at all connection promise will be rejected
            console.error("AMQP connection error.", err);
        })
            .on("close", (err) => {
                connected = false;
                if (!connectionDisconnecting) {
                    console.error("AMQP connection is closed.", err);

                } else {
                    console.error("AMQP connection is closed gracefully.", err);
                }
            })
            .on("blocked", (reason) => {
                console.warn("AMQP connection is blocked.", reason);
            })
            .on("unblocked", () => {
                console.info("AMQP connection is unblocked.");
            });
        this.channel = await connection.createChannel();
        this.channel.prefetch(5);
        this.channel.on('blocked', (reason) => {
            console.log(`Channel is blocked for ${reason}`);
        });
        this.channel.on('unblocked', () => {
            console.log('Channel has been unblocked.');
        });
        
        console.log("channel created");

        //registerConsumers
        resolveHandlers(this.channel);
        this.initialized = true;

    }
}

