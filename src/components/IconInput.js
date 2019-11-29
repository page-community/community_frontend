import React, { useRef } from "react";
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
   const { name, icon, placeholder, type, handleChange, value } = props;

   const onChange = e => {
      handleChange(name, e.target.value);
   };

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
         <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
         ></Input>
      </Wrapper>
   );
};

export default IconInput;
