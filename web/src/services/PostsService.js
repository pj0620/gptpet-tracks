import axios from 'axios';


export class PostsService {
  static getPosts() {
    return [
      {
        text: "Foo",
        timestamp: "3/15/2024 10:00AM"
      },
      {
        text: "Bar",
        timestamp: "3/17/2024 11:28AM"
      }
    ]
  }
}