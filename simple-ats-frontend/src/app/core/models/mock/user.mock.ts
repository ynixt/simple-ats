import { User } from '../user';

export const userMock: () => User = () => ({
  email: 'b@b.com',
  id: 1313,
  name: 'Fake test',
});
