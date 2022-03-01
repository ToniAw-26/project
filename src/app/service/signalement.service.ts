import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment.prod';

const urlSignalement = baseUrl + 'get/signalement/region';

const UrlDetailSignalement = baseUrl + 'detail/signalement';

const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

const urlRegion = baseUrl + 'region/all';

const urlRegionById = baseUrl + 'get/region';

const urlCategory = baseUrl + 'category/all';


const urlSaveSignalement = baseUrl + 'create/signalement';

@Injectable({
  providedIn: 'root'
})
export class SignalementService {

  constructor(private http: HttpClient , private router: Router) {
    this.http = http;
  }

  // tslint:disable-next-line:typedef
  GetSignalement(id: string | null){
    return this.http.get(`${urlSignalement}/${id}`);
  }

  // ------------------------------------------------------------
  // tslint:disable-next-line:typedef
  GetRegionById(id: string | null){
    return this.http.get(`${urlRegionById}/${id}`);
  }

  // tslint:disable-next-line:typedef
  GetCategory(){
    return this.http.get(urlCategory);
  }

  // tslint:disable-next-line:typedef
  GetRegion(){
    return this.http.get(urlRegion);
  }

  Save(formData: FormData): Observable<any>{
    return this.http.post(urlSaveSignalement, formData);
  }

  // ------------------------------------------------------------
  // tslint:disable-next-line:typedef
  getDetailSignalement(latitude: any, longitude: any){
    return this.http.get(`${UrlDetailSignalement}/${latitude}/${longitude}`);
  }
}
