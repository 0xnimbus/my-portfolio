import {React} from 'react';
import styled from 'styled-components'
import GithubLogo from '../assets/github-logo.png'
import LinkedinLogo from '../assets/linkedin-logo.png'
import EmailLogo from '../assets/email-logo.png'

//Styling using styled components
const StyledDiv = styled.div
    `
    background-color: red;
    justify-content: center; 
    text-align: center; 
    `;

const GitImg = styled.img
    `
    background-color: blue;
    margin: 1%;

    `;

function HomePage() {
  return (
    <StyledDiv>
        <h1>Welcome to the Home Page!</h1>
        <GitImg src={GithubLogo} /> 
        <GitImg src={LinkedinLogo} /> 
        <GitImg src={EmailLogo} /> 
    </StyledDiv>  
  );
}

export default HomePage;