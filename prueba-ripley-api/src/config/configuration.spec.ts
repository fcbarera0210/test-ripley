import configuration from './configuration';

describe('configuration', () => {
  beforeAll(() => {
    process.env.DB_HOST = 'sample1';
    process.env.DB_USERNAME = 'sample2';
    process.env.DB_PASSWORD = 'sample3';
    process.env.DB_NAME = 'sample4';
  });

  it('Should return env variables', () => {
    const response = configuration();
    expect(response).toEqual({
      dbHost: 'sample1',
      dbUsername: 'sample2',
      dbPassword: 'sample3',
      dbName: 'sample4',
    });
  });
});
