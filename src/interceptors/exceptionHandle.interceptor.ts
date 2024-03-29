import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { error } from "console";
import { catchError, map, Observable } from "rxjs";

@Injectable()
export class ExceptionHandlerInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>  {
        return next.handle().pipe(
            map((data)=>{
                return {
                    error:false,
                    statuscode:200,
                    message:'ok',
                    data:data
                }
            }),
            catchError((error)=>{
               throw new HttpException(error.message,403);
            })
        )
    }
}