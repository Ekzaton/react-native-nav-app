import { openDatabase } from 'expo-sqlite';

import { Post } from '../types/common';

const db = openDatabase('posts.db');

export default abstract class API {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS posts (id INT PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT, date TEXT, booked INT)',
            [],
            resolve,
            (_, error ) => {
              throw reject(error);
            }
        )
      })
    })
  }

  static getPosts() {
    return new Promise<Post[]>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM posts',
            [],
            (_, result) => resolve(result.rows._array),
            (_, error ) => {
              throw reject(error);
            }
        )
      })
    })
  }
}
