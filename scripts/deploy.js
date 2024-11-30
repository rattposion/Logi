import FtpDeploy from 'ftp-deploy';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.production' });

const ftpDeploy = new FtpDeploy();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: './dist',
  remoteRoot: '/public_html',
  include: ['*', '**/*'],
  exclude: ['**/*.map'],
  deleteRemote: false,
  forcePasv: true
};

ftpDeploy
  .deploy(config)
  .then(res => console.log('Deploy finished:', res))
  .catch(err => console.error('Deploy failed:', err));