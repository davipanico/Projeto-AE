export default {
    jwt: {
      secret: process.env.JWT_SECRET || 'default_test',
      expiresIn: '1d',
    },
  };