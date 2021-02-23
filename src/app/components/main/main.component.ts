import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private _APIService: APIService) {
    console.log("kkkkkkkkkkkk");

    this._APIService.getAPI().subscribe((data) => {
      console.log(data);

    })
  }

  ngOnInit(): void {
  }

}
