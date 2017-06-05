import * as Knex from 'knex';

export class DB {
  private static knexConfig = {
    client: 'mysql2',
    connection: {
      host: 'localhost', // SET HOST
      user: '', // SET USERNAME
      password: '', // SET PASSWORD
      charset: 'utf8'
    },
    pool: {
      min: 0,
      max: 10
    }
  };

  public static knex: Knex = DB.startup();

  private static startup(): Knex {
    const k = Knex(DB.knexConfig);

    if (process.env.KNEX_SHOW_SQL === '1') {
      console.log(`KNEX_SHOW_SQL [${DB.knexConfig.connection.host}_${DB.knexConfig.client}]: Enabled`);
      k.on('query', (queryData) => { console.log(DB.knexConfig.connection.host, queryData); });
    } else {
      console.log(`KNEX_SHOW_SQL [${DB.knexConfig.connection.host}_${DB.knexConfig.client}]: Disabled`);
    }
    return k;
  }

}
