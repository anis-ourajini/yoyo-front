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
      return this.http.post<any>(`https://localhost:7169//OpenAi/PMUTest`,{message}, httpOptions);
  }
}
