import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {DOCUMENT} from "@angular/common";
import {Group} from "@core/models/group";

@Injectable({providedIn: 'root'})
export class GroupService {

  //TODO: Change this URL according to your backend
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/groups';
  private readonly PROD_URL = this.document.location.origin + '/groups';
  URL = this.LOCAL_URL;

}
