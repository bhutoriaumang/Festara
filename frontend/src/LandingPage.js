import * as React from 'react';
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
          'SansitaSwashedRegular'
        ].join(','),
        fontSize: 25,
      },
    });

    return(
        <div className="reg-page">
            <div className="left-reg-page">
              <div>
                  <img src={require('./assets/festara1.png')} alt={""}/>
              </div>
            </div>
            <div className="right-reg-page">
                <div className="welcome-card">
                    <span>Welcome To Festara 2023</span>
                    <br/>
                    Get ready for the biggest cultural fest of 2023,
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
                      <ColorButton variant="contained" sx={{ width: '30vw', marginLeft: '5vw', marginTop: '8vh' }}>SUBMIT</ColorButton>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <CssTextField label="Email Id" id="email-field-2" variant="standard" sx={{ width: '40vw', marginBottom: '3vh' }} type='email'/>
                      <CssTextField label="Password" id="password-field-2" variant="standard" sx={{ width: '40vw' }} type='password'/>
                      <ColorButton variant="contained" sx={{ width: '30vw', marginLeft: '5vw', marginTop: '8vh' }}>SUBMIT</ColorButton>
                    </TabPanel>
                </Box>
                </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;