import { getChannel } from './connection.js';
export async function consumeMessages(exchange, routingKey, queue, onMessage) {
    const channel = getChannel();
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);
    channel.consume(queue, (msg) => {
        if (!msg)
            return;
        const data = JSON.parse(msg.content.toString());
        onMessage(data);
        channel.ack(msg);
    });
}
