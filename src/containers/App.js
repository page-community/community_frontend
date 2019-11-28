import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Write from "./Write";
import MainBoard from "./MainBoard";
import DetailBoard from "./DetailBoard";
import Login from "./Login";

const App = () => {
   return (
      <BrowserRouter>
         <Route exact path="/" component={Login} />
         <Route exact path="/main" component={MainBoard} />
         <Route exact path="/post" component={Write} />
         <Route exact path="/detail/:id" component={DetailBoard} />
      </BrowserRouter>
   );
};

export default App;
