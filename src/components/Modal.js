import React from "react";
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

const Inner = styled("div")`
   background-color: #fff;
   padding: 10rem 4rem;
   z-index: 9999;
`;

const Modal = props => {
   const { visible, children, closeModal } = props;
   return (
      <Wrapper onClick={closeModal} visible={visible}>
         <Inner onClick={e => e.stopPropagation()}>{children}</Inner>
      </Wrapper>
   );
};

export default Modal;
