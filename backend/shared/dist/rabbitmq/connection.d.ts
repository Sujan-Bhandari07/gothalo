import { type Channel } from 'amqplib';
export declare function connectRabbitMQ(): Promise<Channel>;
export declare function getChannel(): Channel;
