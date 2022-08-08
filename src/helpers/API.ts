import { openDatabase } from 'expo-sqlite';

import { PostData, Post } from '../types/common';

const db = openDatabase('posts.db');

export default abstract class API {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, img TEXT, date TEXT, booked INTEGER)',
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

  static createPost(postData: PostData) {
    return new Promise<number>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)',
            [postData.text, postData.date, +postData.booked, postData.img],
            (_, result) => {
              if (result.insertId) resolve(result.insertId);
            },
            (_, error ) => {
              throw reject(error);
            }
        )
      })
    })
  }

  static updatePost(post: Post) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'UPDATE posts SET booked = ? WHERE id = ?',
            [post.booked ? 0 : 1, post.id],
            resolve,
            (_, error) => {
              throw reject(error);
            }
        )
      })
    })
  }

  static deletePost(id: number) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM posts WHERE id = ?',
            [id],
            resolve,
            (_, error) => {
              throw reject(error);
            }
        )
      })
    })
  }
}
