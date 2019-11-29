import React from "react";
import styled from "styled-components";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Modal from "../components/Modal";
import { GoogleLogin } from "react-google-login";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { IoLogoFacebook, IoLogoGoogle, IoMdMail } from "react-icons/io";
import { facebookId, googleId } from "../secret.json";
import IconInput from "../components/IconInput";

@inject("user")
@observer
class Login extends React.Component {
   state = {
      visible: false
   };

   openModal = () => {
      this.setState({
         visible: true
      });
   };

   closeModal = e => {
      this.setState({
         visible: false
      });
   };

   responseFacebook = response => {
      const { user } = this.props;
      if (!response.id) return;
      const data = {
         id: response.id,
         accessToken: response.accessToken,
         name: response.name,
         picture: response.picture.data.url
      };
      user.setUser(data);
      this.handleRedirect();
   };

   responseGoogle = response => {
      const { user } = this.props;
      if (!response.googleId) return;
      const data = {
         id: response.googleId,
         accessToken: response.accessToken,
         name: response.profileObj.name,
         picture: response.profileObj.imageUrl
      };
      user.setUser(data);
      this.handleRedirect();
   };

   handleRedirect = () => {
      const { history } = this.props;
      history.push("/main");
   };

   handleChange = (name, value) => {
      this.setState({
         [name]: value
      });
   };

   handleLogin = () => {
      const { user } = this.props;
      const { email, password } = this.state;
      const response = user.login({
         email,
         password
      });
      console.log(response);
   };

   render() {
      return (
         <Wrapper>
            <Left></Left>
            <Right>
               <FormWrapper>
                  <Heading>누구나 작가가 되어보아요!</Heading>
                  <LoginForm>
                     <SNSLogin onClick={this.openModal} background="#e9ecef">
                        <IoMdMail style={{ color: "#000", fontSize: "2rem" }} />
                        <LoginText color="black">이메일 로그인</LoginText>
                     </SNSLogin>

                     <FacebookLogin
                        appId={facebookId}
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
                     <GoogleLogin
                        clientId={googleId}
                        render={renderProps => (
                           <SNSLogin
                              background="#c92a2a"
                              onClick={renderProps.onClick}
                           >
                              <IoLogoGoogle
                                 style={{ color: "#fff", fontSize: "2rem" }}
                              />
                              <LoginText>Google 로그인</LoginText>
                           </SNSLogin>
                        )}
                        onSuccess={this.responseGoogle}
                        onFailure={response => console.log(response)}
                        cookiePolicy={"single_host_origin"}
                     />
                     <GuestLogin>
                        <GuestLoginText onClick={this.handleRedirect}>
                           로그인 하지 않고 둘러보기
                        </GuestLoginText>
                     </GuestLogin>
                  </LoginForm>
               </FormWrapper>
            </Right>
            <Modal
               title="로그인"
               visible={this.state.visible}
               closeModal={this.closeModal}
            >
               <IconInput
                  ref={ref => (this.email = ref)}
                  name="email"
                  handleChange={this.handleChange}
                  icon="email"
                  placeholder="이메일을 입력해주세요."
                  value={this.state.email}
               />
               <IconInput
                  ref={ref => (this.password = ref)}
                  name="password"
                  handleChange={this.handleChange}
                  type="password"
                  icon="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={this.state.password}
               />

               <Button onClick={this.handleLogin}>로그인</Button>
            </Modal>
         </Wrapper>
      );
   }
}

const Wrapper = styled("div")`
   display: flex;
   height: 100%;

   @media (max-width: 1200px) {
      flex-direction: column;
   }
`;

const Left = styled("div")`
   flex: 1;
   padding: 0, 4rem;
   background-color: #343a40;

   @media (max-width: 1200px) {
      flex: 3;
   }
`;

const Right = styled("div")`
   display: flex;
   flex-direction: column;
   flex: 1;
   justify-content: center;
   align-items: center;
   background-color: #f1f3f5;

   @media (max-width: 1200px) {
      justify-content: flex-start;
      flex: 7;
   }
`;

const FormWrapper = styled("div")`
   width: 600px;
   box-shadow: 0, 0, 4px, rgba(0, 0, 0, 0.05);
   font-size: 1.75rem;
   @media (max-width: 1200px) {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
   }
`;

const Heading = styled("h2")`
   font-size: 1.75rem;
   margin-bottom: 1rem;
   font-weight: normal;

   @media (max-width: 1200px) {
      font-size: 1.2rem;
      margin-top: 3rem;
   }
`;

const LoginForm = styled("div")`
   background-color: #fff;
   padding: 3rem;
   border-radius: 4px;

   @media (max-width: 1200px) {
      padding: 1rem;
   }
`;

const SNSLogin = styled("div")`
   display: flex;
   background: ${props => props.background};
   align-items: center;
   padding: 0.75rem;
   cursor: pointer;

   & + div {
      margin-top: 1.5rem;
   }
`;

const LoginText = styled("p")`
   font-size: 1.2rem;
   color: ${props => (props.color ? "#000" : "#fff")};
   padding-left: 1rem;

   @media (max-width: 1200px) {
      font-size: 1rem;
   }
`;

const GuestLogin = styled("div")`
   font-size: 0.85rem;
   font-weight: 350;
   border-top: 1px solid #ced4da;
   text-align: right;
`;

const GuestLoginText = styled("p")`
   color: #0c8599;
   cursor: pointer;
   transition: 0.3s;

   &:hover {
      opacity: 0.7;
   }
`;

const Button = styled("button")`
   background-color: #0c8599;
   color: #fff;
   border: none;
   outline: none;
   cursor: pointer;
   width: 100%;
   font-size: 1rem;
   margin-top: 1rem;
   transition: 0.3s;

   &:hover {
      opacity: 0.8;
   }
`;

export default withRouter(Login);
