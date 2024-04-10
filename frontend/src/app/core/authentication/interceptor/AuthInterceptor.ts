import {HttpInterceptorFn} from "@angular/common/http";

export const AuthInterceptor:HttpInterceptorFn = (req, next) =>{
  const token = localStorage.getItem('token');

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
    return next(authReq);
  }
  return next(req);
}
