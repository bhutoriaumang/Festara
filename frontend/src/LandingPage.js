import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { StyledTab,StyledTabs,TabPanel,a11yProps } from './componenets/Tabs.js';
import { ColorButton,CssTextField } from './componenets/FormComponenets.js';

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function LandingPage() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const themeA = createTheme({
      typography: {
        fontFamily: [
          'Caveat',
          'cursive'
        ].join(','),
        fontSize: 25,
      },
    });

    return(
        <div className="reg-page">
            <div className="left-reg-page">
            <Carousel autoPlay={true} infiniteLoop={true} interval={5000} showThumbs={false} animationHandler={'fade'}>
                <div>
                    <img src={require('./assets/rivera5.jpg')} alt={""}/>
                </div>
                <div>
                    <img src={require('./assets/rivera7.jpg')} alt={""}/>
                </div>
                <div>
                    <img src={require('./assets/rivera8.png')} alt={""}/>
                </div>
            </Carousel>
            </div>
            <div className="right-reg-page">
                <div className="welcome-card">
                    <span>Welcome To Rivera 2023</span>
                    <br/>
                    Get Ready For The Biggest Cultural Fest,
                    <br/>
                    Register if you are new or Login to continue
                </div>
                <div className="register-or-login">
                <ThemeProvider theme={themeA}>
                <Box sx={{ width: '100%'}}>
                    <StyledTabs value={value} onChange={handleChange} centered>
                        <StyledTab label="Register" {...a11yProps(0)}/>
                        <StyledTab label="Login" {...a11yProps(1)}/>
                    </StyledTabs>
                    <TabPanel value={value} index={0}>
                      <CssTextField label="Name" id="name-field-1" variant="standard" sx={{ width: '40vw' }} />
                      <CssTextField label="Email Id" id="email-field-1" variant="standard" sx={{ width: '40vw', marginTop: '3vh', marginBottom: '3vh' }} type='email'/>
                      <CssTextField label="Password" id="password-field-1" variant="standard" sx={{ width: '40vw' }} type='password'/>
                      <ColorButton variant="contained" sx={{ width: '30vw', marginLeft: '5vw', marginTop: '8vh' }}>Submit</ColorButton>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <CssTextField label="Email Id" id="email-field-2" variant="standard" sx={{ width: '40vw', marginBottom: '3vh' }} type='email'/>
                      <CssTextField label="Password" id="password-field-2" variant="standard" sx={{ width: '40vw' }} type='password'/>
                      <ColorButton variant="contained" sx={{ width: '30vw', marginLeft: '5vw', marginTop: '8vh' }}>Submit</ColorButton>
                    </TabPanel>
                </Box>
                </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;