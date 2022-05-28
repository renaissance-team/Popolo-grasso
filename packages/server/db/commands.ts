/* eslint-disable no-tabs */
import {connect} from './connecton';

export const getTopics = (host: string, port: number) => new Promise((resolve, reject) => {
  connect(host, port).query(
    'select * from popolo.forum_topics',
    (error: any, results: { rows: unknown; }) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    }
  );
});
