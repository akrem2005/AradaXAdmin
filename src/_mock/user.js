import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: sample([
    'user@gmail.com',
    'ainn@gmail.com',
    'jfm93jdm@gmail.com',
    'jr39nwbh@gmail.com',
    'dij2mne@gmail.com',
    'njcjennjne@gmail.com',
    'nfnn93@gmail.com',
    'njc02ih2n3ij@gmail.com',
    'qjn1wij9@gmail.com',
    'z0ii3ue3je@gmail.com',
  ]),
  status: sample(['active', 'banned']),
}));
