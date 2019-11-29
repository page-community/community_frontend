import { action, observable, flow } from "mobx";
import axios from "axios";

class UserStore {
   @observable user = {};

   @action setUser(data) {
      this.user = data;
   }

   login = flow(function*(data) {
      return yield axios.post(`http://localhost:4000/login`, data);
   });
}

export default UserStore;
