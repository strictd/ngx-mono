import * as Knex from 'knex';

export class DB {
  private static knexConfig = {
    client: 'sqlite',
    connection: {
      filename: "./sqlite3.db"
    }
  };

  public static knex: Knex = DB.startup();

  private static startup(): Knex {
    const k = Knex(DB.knexConfig);

    if (process.env.KNEX_SHOW_SQL === '1') {
      console.log(`KNEX_SHOW_SQL [${DB.knexConfig.client}]: Enabled`);
      k.on('query', (queryData) => { console.log(DB.knexConfig.client, queryData); });
    } else {
      console.log(`KNEX_SHOW_SQL [${DB.knexConfig.client}]: Disabled`);
    }
    return k;
  }

}
