import { amqpChannel } from '../amqp.js';
import { emitKafka } from '../kafka.js';
import config from 'config';
import DebugLib from 'debug';

const debug = new DebugLib('server:amqp:producer');

const QUEUE = config.get('amqp.queues.creation');
const OPTIONS = config.get('amqp.options');
const BROKER = config.get('broker');

export function sendRequestToPlanner(request) {

  console.log("Sending request to planner");
  
  if (typeof request !== "string") {
    request = JSON.stringify(request);
  } 

  debug(`sending ${request}`);

  if(BROKER==="rabbit") {
    amqpChannel.sendToQueue(QUEUE, Buffer.from(request));
  } else {
    emitKafka(request);
  }
}