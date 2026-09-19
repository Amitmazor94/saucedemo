export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
} as const;

export const customer = {
  firstName: 'Amit',
  lastName: 'Tester',
  postalCode: '12345',
} as const;
