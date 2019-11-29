import React from "react";
import styled from "styled-components";
import { IoMdMail, IoMdLock, IoMdHelp } from "react-icons/io";

const Wrapper = styled("div")`
   display: flex;
   align-items: center;
   border: 1px solid #ddd;

   & + div {
      margin-top: 1rem;
   }
`;

const Input = styled("input")`
   width: 15rem;
   border: none;
   outline: none;
   padding-left: 0.5rem;
   font-size: 1rem;
   border-radius: 4px;
`;

const Icon = styled("div")`
   display: flex;
   font-size: 1.2rem;
   align-items: center;
   color: #0c8599;
   margin-left: 0.5rem;
`;

const IconInput = props => {
   const { icon, placeholder } = props;

   const returnIcon = () => {
      switch (icon) {
         case "email":
            return <IoMdMail />;
         case "password":
            return <IoMdLock />;
         default:
            return <IoMdHelp />;
      }
   };

   return (
      <Wrapper>
         <Icon>{returnIcon()}</Icon>
         <Input placeholder={placeholder}></Input>
      </Wrapper>
   );
};

export default IconInput;
