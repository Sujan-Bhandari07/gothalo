export declare function consumeMessages<T>(exchange: string, routingKey: string, queue: string, onMessage: (data: T) => Promise<void> | void): Promise<void>;
