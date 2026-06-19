import { IMessageService } from './IMessageService';

export class RateLimitProxy implements IMessageService {
  private lastCallTime = 0;

  constructor(
    private readonly wrappee: IMessageService,
    private readonly intervalMs: number
  ) {}

  send(message: string): void {
    const now = Date.now();

    if (now - this.lastCallTime < this.intervalMs) {
      console.log('[RateLimit] skipped');
      return;
    }

    this.lastCallTime = now;
    this.wrappee.send(message);
  }
}

export function createRateLimitProxy(
  service: IMessageService,
  intervalMs: number
): IMessageService {
  return new RateLimitProxy(service, intervalMs);
}
