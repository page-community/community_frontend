import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

const Wrapper = styled("div")`
   height: 100%;
`;

const CardList = styled("div")`
display: flex;
flex-wrap: wrap;
margin-left: 18rem;
padding: 1rem;

@media (max-width: 1024px) {
   margin-top: 5rem;
   padding: 0.75rem
   margin-left: 0;
}
`;

const Header = styled("div")`
   display: flex;
   justify-content: flex-end;
   padding: 1.75rem;

   @media (max-width: 1023px) {
      background-color: #fff;
   }
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

const MainBoard = props => {
   const { article, history, user } = props;
   let page = 1;
   const contents = useRef();

   const handleScroll = () => {
      const { innerHeight } = window;
      const { scrollHeight } = document.body;
      const scrollTop =
         (document.documentElement && document.documentElement.scrollTop) ||
         document.body.scrollTop;
      if (scrollHeight - innerHeight - scrollTop < 10) {
         article.moreArticles(++page);
      }
   };

   useEffect(() => {
      !article.boards.length && article.fetchArticles(page);
      !article.max && article.getCount();
      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [article, handleScroll, page]);

   const handleLogin = () => {
      history.push("/");
   };

   const itemList = article.boards.map(el => <Card data={el}></Card>);

   return (
      <Wrapper onScroll={handleScroll} ref={contents}>
         <Header>
            {user.user.id ? (
               <Profile src={user.user.picture} alt="profile_img" />
            ) : (
               <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
            )}
         </Header>
         <NavBar />
         <CardList>{itemList}</CardList>
      </Wrapper>
   );
};

export default withRouter(inject("article", "user")(observer(MainBoard)));
