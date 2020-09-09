module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 8710),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '3467bf99a8fa522a8bb51775c11a0b32'),
    },
  },
});
