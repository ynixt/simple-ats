import { LoginResponse } from '..';

export const loginResponseMock: () => LoginResponse = () => ({
  token: 'fakeToken',
});
