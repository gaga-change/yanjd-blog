module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp.qq.com'),
      port: env('SMTP_PORT', 465),
      auth: {
        user: env('SMTP_USERNAME', 'gaga_change@qq.com'),
        pass: env('SMTP_PASSWORD', 'qq邮箱密码'),
      }
    },
    settings: {
      defaultFrom: 'gaga_change@qq.com',
      defaultReplyTo: 'gaga_change@qq.com',
    }
  }
});