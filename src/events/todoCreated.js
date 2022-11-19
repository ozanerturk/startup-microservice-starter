
const eventName = "todo.created";
//todo: could be nice to validate with joi or avj
const Example =
{
    "todoId": "string",
    "name": "string",
    "retry": 0
};

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
    console.log(`${eventName} event published`);

}
module.exports = {
    Example,
    parseAndValidate,
    eventName,
    publish
};
