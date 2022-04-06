import config from 'config';
import { updateEoloPlant } from '../services/eoloPlantService.js';
import { kafka } from '../kafka.js';

import DebugLib from 'debug';

const debug = new DebugLib('server:amqp:consumer');

const QUEUE = config.get('amqp.queues.progress');
const OPTIONS = config.get('amqp.options');

export default function configHandler(amqpChannel) {

  amqpChannel.assertQueue(QUEUE, OPTIONS);

  amqpChannel.consume(QUEUE, async msg => {
    
    const eoloplant = JSON.parse(msg.content.toString());

    debug('eoloplant received', eoloplant.id);

    await updateEoloPlant(eoloplant);

  }, { noAck: true });
}

export function configKafkaHandler() {
  const consumer = kafka.consumer({ groupId: 'test-group' });

  const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: QUEUE, fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log("Consumed from Kafka topic: '", message.value.toString());
        await updateEoloPlant(JSON.parse(message.value));
      },
    })
  }

  run().catch(e => console.error(`[example/consumer] ${e.message}`, e))
}