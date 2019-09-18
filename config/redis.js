'use strict';

/*
|--------------------------------------------------------------------------
| Redis Configuaration
|--------------------------------------------------------------------------
|
| Here we define the configuration for redis server. A single application
| can make use of multiple redis connections using the redis provider.
|
*/

const Env = use('Env')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | connection
  |--------------------------------------------------------------------------
  |
  | Redis connection to be used by default.
  |
  */
  connection: Env.get('REDIS_CONNECTION', 'local'),

  /*
  |--------------------------------------------------------------------------
  | local connection config
  |--------------------------------------------------------------------------
  |
  | Configuration for a named connection.
  |
  */
  local: {
    host: 'ec2-3-215-116-159.compute-1.amazonaws.com',
    port: 26819,
    password:
      'p666671dec37e68f9679d39a01c3857964474660a6567934ea7c867b044fb1a5a',
    db: 0,
    keyPrefix: ''
  },

  /*
  |--------------------------------------------------------------------------
  | cluster config
  |--------------------------------------------------------------------------
  |
  | Below is the configuration for the redis cluster.
  |
  */
  cluster: {
    clusters: [
      {
        host: 'ec2-3-92-170-2.compute-1.amazonaws.com',
        port: 31969,
        password:
          'pa8f587c1b456e323f64510546b9082ad215c5c5c19d59f62167b126f3377e9e2',
        db: 0
      },
      {
        host: 'ec2-3-92-170-2.compute-1.amazonaws.com',
        port: 31969,
        password:
          'pa8f587c1b456e323f64510546b9082ad215c5c5c19d59f62167b126f3377e9e2',
        db: 0
      }
    ]
  }
}
