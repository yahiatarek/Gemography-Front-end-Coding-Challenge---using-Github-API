import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
const axios = require('axios').default;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  Items: any
  GithubUrl: string = "https://api.github.com/search/repositories?q=created:%3E2017-10-22&sort=stars&order=desc"
  names = new BehaviorSubject("");
  myName: any
  constructor(public _APIService: APIService) {
    const axios = require('axios');
    axios.get(this.GithubUrl)
      .then((data) => {
        this.Items = data.data.items
        console.log(this.Items);
      })
      .catch((error) => {

      })
      .then(() => {
        this.Items.forEach(element => {
          console.log(element.owner.url)
          let url = element.owner.url
          axios.get(url).then((data) => {
            if (data) {
              this.loop(data.data.name)

            } else {
              return "unknown"
            }
          }).catch(() => {
            console.log("error");

          })

        });




      });


  }
  loop(data) {
    this.names.next(data)
  }
  ngOnInit(): void {
    this.names.subscribe((data) => {
      this.myName = this.names.value
    })
  }

}
