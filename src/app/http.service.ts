import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  private http: HttpClient = inject(HttpClient);

    public requestMsg(message: string | undefined): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
      return this.http.get<any>(`https://66a7-77-193-71-182.ngrok-free.app/OpenAi/gettest`, httpOptions);
  }
}
