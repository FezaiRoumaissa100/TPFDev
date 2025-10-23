import { Controller, Get, Inject } from '@nestjs/common';
import { TestService } from './test.service';
import { CONSTANTS } from 'src/common/constants';

@Controller('test')
export class TestController {
  constructor(
    private readonly testService: TestService,
    @Inject(CONSTANTS.UUID_PROVIDER) private readonly uuid: () => string,
  ) {}
  @Get('uuid')
  getUuid() {
    return {
      uuid: this.uuid(),
      message: this.testService.createItem(),
    };
  }
}