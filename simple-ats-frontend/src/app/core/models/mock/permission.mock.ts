import { Permission } from '../permission';

export const permissionsMock: () => Permission[] = () => [
  {
    code: 'register_job_vacancy',
  },
  {
    code: 'delete_job_vacancy',
  },
  {
    code: 'apply_job',
  },
];
