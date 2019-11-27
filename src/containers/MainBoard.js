import React, { Component } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { inject, observer } from "mobx-react";

@inject("article", "user")
@observer
class MainBoard extends Component {
   componentDidMount() {
      const { article } = this.props;
      article.fetchArticles();
   }

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
         margin-left: 15rem;
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
         border-radius: 50%;
      `;

      const itemList = article.boards.map(el => (
         <Card key={el.id} data={el}></Card>
      ));

      return (
         <Wrapper>
            <NavBar />
            <Header>
               <Profile src={user.user.picture} alt="profile_img" />
            </Header>
            <CardList>{itemList}</CardList>
         </Wrapper>
      );
   }
}

export default MainBoard;
