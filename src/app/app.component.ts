import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {from, map, merge, Observable, scan, Subject} from "rxjs";
import {ChatModule, Message, SendMessageEvent, User} from "@progress/kendo-angular-conversational-ui";
import {ChatService} from "./chat.service";
import {HttpService} from "./http.service";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, ChatModule, HttpClientModule],
  providers: [ChatService, HttpService],
  standalone: true,
})
export class AppComponent implements OnInit {
  private chatService: ChatService = inject(ChatService) ;
  public feed$: Observable<Message[]> = new Observable<Message[]>();

  public readonly user: User = {
    id: 1,
  };

  public readonly bot: User = {
    id: 0,
  };

  private local: Subject<Message> = new Subject<Message>();

  public ngOnInit(): void {
    const welcomeMsg: Message = {
      author: this.bot,
      suggestedActions: [
        {
          type: "reply",
          value: "I want to know my bets",
        },
        {
          type: "reply",
          value: "Why did I loose?",
        },
      ],
      timestamp: new Date(),
      text: "Hello, this is a demo for YOYO bot. I don`t do much for now, but you can say hello!",
    };

    // Merge local and remote messages into a single stream
    this.feed$ = merge(
      from([welcomeMsg]),
      this.local,
      this.chatService.responses.pipe(
        map(
          (response): Message => ({
            author: this.bot,
            text: response,
          })
        )
      )
    ).pipe(
      // ... and emit an array of all messages
      scan((acc: Message[], x: Message) => [...acc, x], [])
    );
  }

  public sendMessage(e: SendMessageEvent): void {
    this.local.next(e.message);
    this.local.next({
      author: this.bot,
      typing: true,
    });
    this.chatService.submit(e.message.text);
  }
}
