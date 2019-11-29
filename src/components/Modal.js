import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled("div")`
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100%;
   z-index: 100;
   position: fixed;
   background-color: rgba(0, 0, 0, 0.5);
   display: ${props => (props.visible ? "flex" : "none")};
`;

const Title = styled("div")`
   width: 100%;
   background-color: #0c8599;
   height: 3rem;
   line-height: 3rem;
   color: #fff;
   text-align: center;
   font-size: 1.5rem;
`;

const InputForm = styled("div")`
   padding: 10rem 4rem;
`;

const Inner = styled("div")`
   background-color: #fff;
   z-index: 9999;
`;

const Modal = props => {
   const [data, setData] = useState({});

   const handleChange = (name, value) => {
      setData({
         [name]: value,
         ...data
      });
   };

   const { title, visible, children, closeModal } = props;
   return (
      <Wrapper onClick={closeModal} visible={visible}>
         <Inner onClick={e => e.stopPropagation()}>
            <Title>{title}</Title>
            <InputForm>{children}</InputForm>
         </Inner>
      </Wrapper>
   );
};

export default Modal;
