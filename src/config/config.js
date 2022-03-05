require('dotenv').config();
const convict = require('convict');

// Define a schema
var config = convict({
    env: {
      doc: 'The application environment.',
      format: ['production', 'development', 'test'],
      default: 'development',
      env: 'NODE_ENV'
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 4000,
      env: 'PORT',
      arg: 'port'
    },
    db: {
      host: {
        doc: 'Database host name/IP',
        format: '*',
        default: 'localhost'
      },
      name: {
        doc: 'Database name',
        format: String,
        default: 'postgres'
      },
      user_name: {
        doc: 'Database user name',
        format: String,
        default: 'root'
      },
      password: {
        doc: 'Database user password',
        format: String,
        default: 'saravana7',
      },
      port: {
        doc: 'Database user password',
        format: Number,
        default: 5432,
      }
    }
  });
  

// Load environment dependent configuration
var env = config.get('env');
config.loadFile(`./src/config/${env}.json`);

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;