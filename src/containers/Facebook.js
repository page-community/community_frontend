import React from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { IoLogoFacebook, IoLogoGoogle } from "react-icons/io";

@inject("user")
@observer
class Facebook extends React.Component {
   responseFacebook = response => {
      const { user, history } = this.props;
      if (!response.id) return;
      const data = {
         id: response.id,
         accessToken: response.accessToken,
         name: response.name,
         picture: response.picture.data.url
      };
      user.setUser(data);
      history.push("/");
   };

   render() {
      const Wrapper = styled("div")`
         display: flex;
         height: 100%;
      `;

      const Left = styled("div")`
         flex: 1;
         padding: 0, 4rem;
         background-color: #343a40;
      `;

      const Right = styled("div")`
         display: flex;
         flex-direction: column;
         flex: 1;
         justify-content: center;
         align-items: center;
         background-color: #f1f3f5;
      `;

      const FormWrapper = styled("div")`
         width: 500px;
      `;

      const Heading = styled("h2")`
         font-size: 1.75rem;
         font-weight: 400;
         margin-bottom: 1rem;
      `;

      const LoginForm = styled("div")`
         background-color: #fff;
         padding: 3rem;
      `;

      const SNSLogin = styled("div")`
         display: flex;
         background: ${props => props.background};
         align-items: center;
         padding: 0.875rem;
         cursor: pointer;

         & + div {
            margin-top: 1.5rem;
         }
      `;

      const LoginText = styled("p")`
         font-size: 1.2rem;
         color: #fff;
         padding-left: 1rem;
      `;

      return (
         <Wrapper>
            <Left></Left>
            <Right>
               <FormWrapper>
                  <Heading>누구나 작가가 되어보아요!</Heading>
                  <LoginForm>
                     <FacebookLogin
                        appId={518427429008174}
                        fields="name, picture"
                        isMobile={true}
                        disableMobileRedirect={true}
                        callback={this.responseFacebook}
                        render={renderProps => (
                           <SNSLogin
                              background="#3b5bdb"
                              onClick={renderProps.onClick}
                           >
                              <IoLogoFacebook
                                 style={{ color: "#fff", fontSize: "2rem" }}
                              />
                              <LoginText>Facebook 로그인</LoginText>
                           </SNSLogin>
                        )}
                     />
                     <SNSLogin background="#c92a2a">
                        <IoLogoGoogle
                           style={{ color: "#fff", fontSize: "2rem" }}
                        />
                        <LoginText>Google 로그인</LoginText>
                     </SNSLogin>
                  </LoginForm>
               </FormWrapper>
            </Right>
         </Wrapper>
      );
   }
}

export default withRouter(Facebook);
