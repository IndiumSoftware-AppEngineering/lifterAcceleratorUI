/* eslint-disable @typescript-eslint/no-unused-vars */
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { NextResponse } from 'next/server';

const kafka = new Kafka({
  clientId: 'nextjs-consumer',
  brokers: ['localhost:9092'], // Kafka broker address
});

const consumer: Consumer = kafka.consumer({ groupId: 'test-group' }); // Consumer group

export async function GET() {
  try {
    // Connect to Kafka
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

    // Consume messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        const msg = message.value?.toString(); // Use optional chaining to handle potential undefined value
        if (msg) {
          console.log('Received message:', msg);
        }
      },
    });

    return NextResponse.json({ message: 'Kafka consumer started' }, { status: 200 });
  } catch (error) {
    console.error('Error consuming messages:', error);
    return NextResponse.json({ error: 'Failed to consume messages' }, { status: 500 });
  }
}