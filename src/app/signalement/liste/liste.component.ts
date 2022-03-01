import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { SignalementService } from 'src/app/service/signalement.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  public layerType!: string;
  public markerSettings!: object;
  public zoomSettings!: object;
  public tooltipSettings!: object;
  idRegion = sessionStorage.getItem('region');
  public loading = false;
  signalement: any;
  message: any;
  tableData = [];
  listSignalement: any;
  value = 1;
  latitude!: number;
  longitude!: number;


  // tslint:disable-next-line:ban-types
  Source: Array<{latitude: Number, longitude: Number, name: string}> = [];

  displayedColumns: string[] = ['ID', 'Régions', 'User', 'Type', 'Status', 'Actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(
    private loginService: LoginService,
    private signalementService: SignalementService,
    private router: Router,
    private route: ActivatedRoute) {
      this.loginService.isConnected();
    }

  ngOnInit(): void {
    this.GetSignalement();
    this.layerType = 'OSM';
    this.zoomSettings = {
      enable: true,
      horizontalAlignment: 'Near',
      shouldZoomInitially: true
    };

  }

  // tslint:disable-next-line:typedef
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // tslint:disable-next-line:typedef
  GetSignalement(){
    this.loading = true;
    const success  = (response: any) => {
      if (response.status === 200){
        this.loading = false;
        this.listSignalement = response.data;
        this.dataSource = new MatTableDataSource(this.listSignalement);
        this.dataSource.paginator = this.paginator;
        console.log(response.data);
        // tslint:disable-next-line:max-line-length
        response.data.forEach((element: { latitudesignalement: any; longitudesignalement: any; region: { region: any; }; category: {name: any} }) => {
          this.Source.push({
            latitude: element.latitudesignalement,
            longitude: element.longitudesignalement,
            name: element.region.region + ', ' + element.category.name
          });
        });
        this.markerSettings = [{
          visible: true,
          height: 20,
          width: 20,
          dataSource: this.Source,
          tooltipSettings: {
            visible: true,
            valuePath: 'name',
        }
        }];

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

    this.signalementService.GetSignalement(this.idRegion).subscribe(success, error);
  }

  // tslint:disable-next-line:typedef
  markerClicked(event: { data: any; }){
    this.latitude = event.data.latitude;
    this.longitude = event.data.longitude;
    // tslint:disable-next-line:prefer-const
    let url = '/detail/signalement';
    // tslint:disable-next-line:prefer-const
    let myurl = `${url}/${this.latitude}/${this.longitude}`;
    this.router.navigateByUrl(myurl);
  }

  // tslint:disable-next-line:typedef
  mapClicked(event: any){
    console.log(event);
  }

  // tslint:disable-next-line:typedef
  onChange(event: any){
    this.value = event.target.value;
  }
}
