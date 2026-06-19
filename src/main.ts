import { MessageService } from './MessageService';
import { createRateLimitProxy } from './RateLimitProxy';

const messageService = new MessageService();
const service = createRateLimitProxy(messageService, 1000);

console.log('Testing the anti-spam system:');
service.send('Hello! How are you?');
service.send('Why are you not answering?');

setTimeout(() => {
  service.send('This message will pass because we waited for 1 second');
}, 1100);
