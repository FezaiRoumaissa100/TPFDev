import { Injectable, Inject } from '@nestjs/common';
import { CONSTANTS } from 'src/common/constants';

@Injectable()
export class TestService {
  constructor(@Inject(CONSTANTS.UUID_PROVIDER) private readonly uuidGenerator: () => string) {}

  createItem() {
    const id = this.uuidGenerator(); 
    return { id, createdAt: new Date().toISOString() };
  }
}