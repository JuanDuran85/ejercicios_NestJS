export const INTERVAL_HOST_KEY = 'INTERNAL_HOST_KEY';

import { SetMetadata } from '@nestjs/common';

export const IntervalHost: ClassDecorator = SetMetadata(INTERVAL_HOST_KEY, true);
