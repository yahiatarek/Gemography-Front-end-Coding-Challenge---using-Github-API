import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
const axios = require('axios').default;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  notScroll = true
  arraySabet = new BehaviorSubject<number[]>([]);
  newArraySabet: number[] = [];
  Items: any
  myName: any
  GithubUrl: string
  names = new BehaviorSubject("");
  pageNo: number = 0
  constructor(public _APIService: APIService, public spinner: NgxSpinnerService) {
    this.getDate30DaysBefore()
    const axios = require('axios');
    this.display("")
  }
  getDate30DaysBefore() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let dateString = date.toISOString().split('T')[0];
    this.GithubUrl = `https://api.github.com/search/repositories?q=created:%3E${dateString}&sort=stars&order=desc`
    //console.log(dateString);

  }
  loop(data) {
    this.names.next(data)
  }

  ngOnInit(): void {
    this.names.subscribe((data) => {
      this.myName = data

    })
    this.arraySabet.subscribe((data) => {
      //console.log(data);
      this.newArraySabet = data
    })

  }

  display(page) {

    axios.get(this.GithubUrl + page)
      .then((data) => {
        this.Items = data.data.items
      })
      .catch((error) => {

      })
      .then(() => {
        this.Items.forEach(element => {
          let url = element.owner.url
          let now = new Date()
          let date = new Date(element.pushed_at)
          let daysAgo = Math.abs(now.getTime() - date.getTime());
          let days = Math.round(daysAgo / (60 * 60 * 24 * 1000))
          let array: number[] = []
          array.push(days)
          this.arraySabet.next(array)
          //this.addingDays(days)
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
  onScroll() {
    if (this.notScroll) {
      this.spinner.show()
      this.notScroll = false
      this.pageNo++

      let myPage = `&page=${this.pageNo}`
      axios.get(this.GithubUrl + myPage)
        .then((data) => {
          this.Items = this.Items.concat(data.data.items)
          this.notScroll = true
        })
        .catch((error) => {

        })
    }

  }


}
