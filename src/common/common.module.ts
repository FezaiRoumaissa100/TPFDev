import { Module, Global } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CONSTANTS } from './constants';

@Global()
@Module({
    providers: [{
        provide: CONSTANTS.UUID_PROVIDER, useValue:uuid, }
    ],
    exports: [CONSTANTS.UUID_PROVIDER],
})
export class CommonModule { }
