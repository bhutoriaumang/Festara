import * as React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { StyledTab,StyledTabs,TabPanel,a11yProps } from './componenets/Tabs.js';
import Registration from './componenets/Registration.js';
import Login from './componenets/Login.js';

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
                      <Registration />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <Login />
                    </TabPanel>
                </Box>
                </ThemeProvider>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;