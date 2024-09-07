import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import amqp, { Channel, ChannelWrapper } from 'amqp-connection-manager';

@Injectable()
export class RabbitMQPublisher implements OnModuleDestroy {
  private channelWrapper: ChannelWrapper;
  constructor() {
    const connection = amqp.connect([process.env.RABBITMQ_URI]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('daily_sales_report', { durable: true });
      },
    });
  }

  async publish(queue: string = 'daily_sales_report', message: any) {
    try {
      await this.channelWrapper.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(message)),
      );

      Logger.log(`Sent to ${queue}`);
    } catch (error) {
      Logger.error(`Failed to send message to ${queue}`, error.stack);
    }
  }

  async onModuleDestroy() {
    try {
      await this.channelWrapper.close();
      Logger.log('RabbitMQ connection closed');
    } catch (error) {
      Logger.error('Error closing AMQP connection, error.stack');
    }
  }
}
