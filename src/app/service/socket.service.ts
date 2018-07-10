import {Injectable, EventEmitter} from '@angular/core';
import {Headers} from '@angular/http';
import {Http, RequestOptions, ResponseContentType} from '@angular/http';
import 'rxjs/add/operator/map';
import {environment} from '../../environments/environment';

@Injectable()
export class SocketService {

    private socket: WebSocket;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor(private http: Http) {

    }

    public connect(uuid: string) {
        if (environment.production) {
            this.socket = new WebSocket('ws://76.8.60.109:5000/get-test-updates/' + uuid + '/ws');
        }else{
            this.socket = new WebSocket('ws://localhost:5000/get-test-updates/' + uuid + '/ws');
        }

        this.socket.onopen = event => {
            this.listener.emit({'type': 'open', 'data': event});
        };
        this.socket.onclose = event => {
            this.listener.emit({'type': 'close', 'data': event});
        };
        this.socket.onmessage = event => {
            this.listener.emit({'type': 'message', 'data': JSON.parse(event.data)});
        };
    }

    public send(data: string) {
        this.socket.send(data);
    }

    public close() {
        this.socket.close();
    }

    public getEventListener() {
        return this.listener;
    }

    public download(url: string) {
        let options = new RequestOptions({responseType: ResponseContentType.Blob});
        return this.http.get(url, options)
            .map(res => res.blob());
    }
}
