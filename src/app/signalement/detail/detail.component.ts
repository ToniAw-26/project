import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignalementService } from 'src/app/service/signalement.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public loading = false;
  latitude = this.route.snapshot.paramMap.get('latitude');
  longitude = this.route.snapshot.paramMap.get('longitude');
  detail: any;
  message: any;
  constructor(private route: ActivatedRoute,
    // tslint:disable-next-line:align
    private signalementService: SignalementService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  // tslint:disable-next-line:typedef
  getDetail(){
    this.loading = true;
    const success  = (response: any) => {
      if (response.status === 200){
        this.loading = false;
        this.detail = response.data;
      }else{
        this.loading = false;
        this.message = response.message;
      }
    };
    const error  = (response: any) => {
      if (response.status === 400){
        this.loading = false;
        this.message = response.message;
    }
    };

    this.signalementService.getDetailSignalement(this.latitude, this.longitude).subscribe(success, error);
  }

}
