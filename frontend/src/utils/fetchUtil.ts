import { getCookie } from './cookies';

type TFetchAuth = {
  api: string;
  id?: number;
  body?: object;
  method: string;
};

export async function fetchAuth(params: TFetchAuth) {
  const { api, id, method, body } = params;
  const token = getCookie('token');
  const authToken = `Bearer ${token}`;

  return await fetch(`http://localhost:4001/api/${api}/${id ?? ''}`, {
    method: method,
    headers: {
      Authorization: authToken,
      'Content-Type': 'application/json',
    },
    ...(['UPDATE', 'POST'].includes(method) && { body: JSON.stringify(body) }),
  });
}
