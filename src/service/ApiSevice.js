import { API_BASE_URL } from '../config/app-config';

export function call(api, method, req) {
  let options = {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (req) {
    options.body = JSON.stringify(req);
  }
  return fetch(options.url, options).then((res) => {
    res.json().then((json) => {
      if (!res.ok) {
        return Promise.reject(json);
      }
      return json;
    });
  });
}

//api 요청을 항 상 반복되는 문장을 썼던기억이 있는데 이렇게 그것또한 모듈로 작성해준다면 좀더 간결하게 쓸수 있을거같다
