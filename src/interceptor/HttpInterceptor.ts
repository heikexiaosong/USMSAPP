import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';

export class HttpInterceptor implements Interceptor {

  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    request.options.headers.append("Auth-Token", localStorage.getItem("auth_token"));
    return request;
  }

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    return response;
  }

}
