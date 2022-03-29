import { API_BASE_URL } from '../config/app-config';
import axios from 'axios';

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(json);
        }
        return json;
      }),
    )
    .catch((error) => {
      // 추가된 부분
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = '/login'; // redirect
      }
      return Promise.reject(error);
    });
}

//api 요청을 항 상 반복되는 문장을 썼던기억이 있는데 이렇게 그것또한 모듈로 작성해준다면 좀더 간결하게 쓸수 있을거같다
export function signin(userDTO) {
  return call('/auth/signin', 'POST', userDTO).then((response) => {
    console.log('124124', response);
    if (response.token) {
      // 로컬 스토리지에 토큰 저장
      localStorage.setItem('ACCESS_TOKEN', response.token);
      // token이 존재하는 경우 Todo 화면으로 리디렉트
      window.location.href = '/';
    }
  });
}

export function signout() {
  localStorage.setItem('ACCESS_TOKEN', null);
  window.location.href = '/login';
}

export function signup(userDTO) {
  axios
    .post('http://localhost:8080/auth/signup', userDTO, {
      headers: { 'Content-Type': `application/json` },
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) window.location.href = '/login';
    });
}
