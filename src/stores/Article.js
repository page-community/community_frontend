import { observable, flow, computed } from "mobx";
import axios from "axios";

class ArticleStore {
   @observable
   boards = [];

   @observable
   max;

   fetchArticles = flow(function*(page) {
      const response = yield axios.get(`http://localhost:4000/boards/${page}`);
      if (response.status === 200) {
         this.boards = [...this.boards, ...response.data];
      }
   });

   moreArticles = flow(function*(page) {
      if ((page - 1) * 12 + 1 < this.max) {
         yield this.fetchArticles(page);
      }
   });

   fetchArticle = flow(function*(id) {
      const response = yield axios.get(`http://localhost:4000/board/${id}`);
      if (response.status === 200) {
         return response.data;
      }
   });

   getCount = flow(function*() {
      const response = yield axios.get("http://localhost:4000/boards/count");
      this.max = response.data.size;
   });

   postArticle = flow(function*(data) {
      const response = yield axios.post("http://localhost:4000/post", data);
      return response;
   });

   @computed get boardSize() {
      return this.boards.length;
   }
}

export default ArticleStore;
