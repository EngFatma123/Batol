import type { CallFunction, CallServer } from "./interface/callServer";
const defaultOptions: CallServer = {
  url: "",
  auth: false,
  data: {},
  method: "GET",
  type: "application/json",
  base: true,
};

/**
 * call server function to handel request from client to server
 * @param {CallServer} options - call server options
 * @returns
 */
let callServer: CallFunction = async (options) => {
  // set options
  options = {
    ...defaultOptions,
    ...options,
  };
  //live : https://batol-travel.onehand.dev
  // base url https://develop.batol-travel.onehand.dev
  const base_url: string = `https://develop.batol-travel.onehand.dev`;

  const end_point: string = `${base_url}/${options.url}`;
  // header
  const reqHeader = new Headers();

  // accept type
  reqHeader.append("Accept", "application/json");
  reqHeader.append("Access-Control-Allow-Origin", "*");
  // if type return false for make request calc data
  if (options.type) reqHeader.append("Content-Type", options.type as string);
  // set lang
  reqHeader.append("X-App-Locale", "ar");
  reqHeader.append("x-api-key", "DeXw9Q");
  const token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : sessionStorage.getItem("access_token");

  // check if is auth request
  if (options.auth) {
    reqHeader.append(
      "Authorization",
      `Bearer ${token}`
    );
  }
  // console.log(options.data!.constructor.name);
  // resposne
  let response = null;
  if (options.method == "POST" || options.method == "PUT") {
    if (options.data!.constructor.name != "Object") {
      response = await fetch(end_point, {
        method: options.method,
        mode: "cors",
        headers: reqHeader,
        body: options.data as FormData,
      });
    } else {
      console.log(options.data);
      response = await fetch(end_point, {
        method: options.method,
        headers: reqHeader,
        mode: "cors",
        body: JSON.stringify(options.data),
      });
    }
  } else {
    response = await fetch(end_point, {
      method: options.method,
      mode: "cors",
      headers: reqHeader,
    });
  }

  return await response;
};

export default callServer;
