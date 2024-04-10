import {Inject, Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {DOCUMENT} from "@angular/common";
import {GroupMembership} from "@core/models/group";

@Injectable({providedIn: 'root'})
export class GroupMembershipService {

  //TODO: Change this URL according to your backend
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  private readonly LOCAL_URL = 'http://localhost:3000/group-memberships';
  private readonly PROD_URL = this.document.location.origin + '/group-memberships';
  URL = this.PROD_URL;


}
