const eventName = "event.error";
const Example = {
    event: {},
    consumer: "",
    error: new Error("some error"),
};
/**
 * parse json string to event object 
 * @param {string} msg
 * @returns {Example}
 */
function parseAndValidate(msg) {
    let parsed = JSON.parse(msg);
    return parsed;
}
/**
 * parse json string to event object 
 * @param {Example} payload
 */
async function publish(channel, payload) {
    await channel.assertExchange(eventName, 'fanout');
    channel.publish(
        eventName,
        "",
        Buffer.from(JSON.stringify(payload))
    );
    console.log(`${eventName} event published payload:${JSON.stringify(payload)}`);
}

module.exports = {
    parseAndValidate,
    eventName,
    publish
};