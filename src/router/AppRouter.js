import React, { Component } from 'react';
import App from '../App';

import { Route, Routes } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Login from '../component/login/Login';
import SignUp from '../component/signup/SignUp';

const Copyright = () => {
  //클래스에서 함수를 써서 에러가 나고있음
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright @'}
      가나다라 컴퍼니,{new Date().getFullYear}
    </Typography>
  );
};

class AppRouter extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <Box mt={5}>
          <Copyright />
        </Box>
      </div>
    );
  }
}

export default AppRouter;
