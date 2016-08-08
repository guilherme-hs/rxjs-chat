/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ThreadService } from './thread.service';

describe('Service: Thread', () => {
  beforeEach(() => {
    addProviders([ThreadService]);
  });

  it('should ...',
    inject([ThreadService],
      (service: ThreadService) => {
        expect(service).toBeTruthy();
      }));
});
