import './HomePage.css' 
// import React, {useState} from 'react'
import React from 'react'
// import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import AboutMe from './AboutMe'
import GithubLogo from '../../assets/github-logo.png'
import LinkedinLogo from '../../assets/linkedin-logo.png'
import EmailLogo from '../../assets/email-logo.png'

function HomePage() {

  const yoyoVariants = {
    hover: {
      scale: 1.2, // Scale up by 20%
      transition: {
        duration: 0.5, // Duration of one way of the animation
        repeat: Infinity, // Repeat the animation infinitely
        repeatType: "reverse", // Reverse the animation on each iteration
        ease: "easeInOut" // Use an ease-in-out timing function for a smooth effect
      }
    }
  }  

  const hoverAnimation = {
    rotateY: 360, // Complete one full rotation around the Y axis
  };

  // Define transition properties for the hover animation
  const hoverTransition = {
    duration: 2, // Duration for one complete spin
    ease: "linear",
    repeat: Infinity, // Repeat the animation infinitely
    repeatType: "reverse", // Loop the animation without reversing
  };

  return (
    <div id='main-div'>
        <h1>Welcome to the Home Page!</h1>
        <div class='icon-div'>
          <motion.img 
            src={GithubLogo} 
            whileHover={{ scale: 1.1, rotate: 10 }} 
            transition={{ 
              type: "spring", 
              stiffness: 100,
              damping: 20, 
              velocity: 3,
            }}
            className="icon-img"
          />
          <motion.img 
            src={LinkedinLogo}
            variants={yoyoVariants}
            whileHover='hover'
            class='icon-img' 
          />
          <motion.img 
            src={EmailLogo}
            whileHover={{
              ...hoverAnimation,
              transition: hoverTransition
            }}
            style={{
              perspective: 500, // Adjust for more or less depth
              originX: 0.5,
              originY: 0.5, // Ensures the spin is around the center
              // display: 'block', // Ensures the img element is treated correctly for transforms
            }}
            class='icon-img'  
          />

        </div>
        <AboutMe/>
        <h1> <Link to='nebula'> NEBULA LINK</Link></h1>
    </div>  
    
  );
}

export default HomePage;