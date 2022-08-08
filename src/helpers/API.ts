import { openDatabase } from 'expo-sqlite';

import { NewPost, Post } from '../types/common';

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

  static createPost(post: NewPost) {
    return new Promise<number>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)',
            [post.text, post.date, +post.booked, post.img],
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
}
