import {Subject, tap} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {HttpService} from "./http.service";

// Mock remote service

@Injectable({
    providedIn: "root"
})
export class ChatService {
    private httpService: HttpService = inject(HttpService);
    public readonly responses: Subject<string> = new Subject<string>();

    public submit(question: string | undefined): void {
      console.log(question)
      this.httpService.requestMsg(question).subscribe(
        {
          next: (data: any) => this.responses.next(data.text),
          error: error => this.responses.next('error')
        }
      );
     //   const length = question?.length;
      //  const answer = `"${question}" contains exactly ${length} symbols.`;

       // setTimeout(() => this.responses.next(answer), 1000);
    }
}
