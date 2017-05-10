import { Injectable } from '@angular/core';
import {MessagesModule} from 'primeng/primeng';

@Injectable()
export class MsgService {
  msgs: MessagesModule[] = [];
}