export function handleJsonResponse(response: Response): any {
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

export function httpGet(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<any> {
  return fetch(input, init).then(handleJsonResponse);
}

export function httpPost(
  input: RequestInfo,
  data: any,
  init: RequestInit = {}
): Promise<any> {
  const headers = (init.headers as Headers) || new Headers();
  headers.append('Content-Type', 'application/json');

  init = Object.assign({}, init, {
    method: 'POST',
    body: JSON.stringify(data),
    headers,
  });

  return fetch(input, init).then(handleJsonResponse);
}

export function httpPut(
  input: RequestInfo,
  data: any,
  init: RequestInit = {}
): Promise<any> {
  const headers = (init.headers as Headers) || new Headers();
  headers.append('Content-Type', 'application/json');

  init = Object.assign({}, init, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers,
  });

  return fetch(input, init).then(handleJsonResponse);
}

export function httpDelete(
  input: RequestInfo,
  init: RequestInit = {}
): Promise<any> {
  init = Object.assign({}, init, {
    method: 'DELETE',
  });

  return fetch(input, init).then(handleJsonResponse);
}

export function generateAsyncActionNames(baseName: string) {
  return {
    base: baseName,
    pending: `${baseName}_PENDING`,
    fulfilled: `${baseName}_FULFILLED`,
    rejected: `${baseName}_REJECTED`,
  };
}
