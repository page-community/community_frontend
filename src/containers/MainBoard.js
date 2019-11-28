import React, { Component } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("article", "user")
@observer
class MainBoard extends Component {
   componentDidMount() {
      const { article } = this.props;
      article.fetchArticles();
   }

   handleLogin = () => {
      const { history } = this.props;
      history.push("/");
   };

   render() {
      const { article, user } = this.props;
      const Wrapper = styled("div")`
         background-color: #f1f3f5;
         height: 100%;
      `;

      const CardList = styled("div")`
         display: flex;
         flex-wrap: wrap;
         overflow-y: scroll;
         margin-left: 18rem;
         padding: 1rem;

         @media (max-width: 768px) {
            margin: 0;
            margin-top: 2rem;
         }
      `;

      const Header = styled("div")`
         display: flex;
         justify-content: flex-end;
         padding: 1.75rem;
      `;

      const Profile = styled("img")`
         width: 50px;
         height: 50px;
         border-radius: 50%;
      `;

      const LoginBtn = styled("button")`
         background: none;
         border: 1px solid #495057;
         color: #495057;
         outline: none;
         font-size: 0.875rem;
         padding: 0.5rem 0.875rem;
         border-radius: 4px;
         line-height: 0.875rem;
         cursor: pointer;

         &:hover {
            border: 1px solid #0c8599;
            color: #0c8599;
         }
      `;

      const itemList = article.boards.map(el => (
         <Card key={el.id} data={el}></Card>
      ));

      return (
         <Wrapper>
            <NavBar />
            <Header>
               {user.user.id ? (
                  <Profile src={user.user.picture} alt="profile_img" />
               ) : (
                  <LoginBtn onClick={this.handleLogin}>로그인</LoginBtn>
               )}
            </Header>
            <CardList>{itemList}</CardList>
         </Wrapper>
      );
   }
}

export default withRouter(MainBoard);
