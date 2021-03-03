import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { APIService } from 'src/app/services/api.service';
declare var $: any
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatRipple } from '@angular/material/core';
const axios = require('axios').default;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  panelOpenState = false;
  notScroll = true
  Items: any[] = [{ myItems: [], dates: [], names: [] }]
  GithubUrl: string
  pageNo: number = 1
  constructor(private _snackBar: MatSnackBar, public _APIService: APIService, public spinner: NgxSpinnerService) {


    this.getDate30DaysBefore()
    const axios = require('axios');
    this.display("")

  }


  openSnackBar() {
    this._snackBar.open("You're now on top!!", '', {
      duration: 2000,
      panelClass: ['blue-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  getDate30DaysBefore() {
    let date = new Date();
    date.setDate(date.getDate() - 30);
    let dateString = date.toISOString().split('T')[0];
    this.GithubUrl = `https://api.github.com/search/repositories?q=created:%3E${dateString}&sort=stars&order=desc`

  }


  ngOnInit(): void {


  }

  display(page) {
    axios.get(this.GithubUrl + page)
      .then((data) => {
        this.Items[0].myItems = data.data.items
      })
      .catch((error) => {

      })
      .then(() => {
        this.updatingDatesAndNames()

      });
  }

  scrollToTop() {
    if (window.scrollY == 0) {
      this.isUp()
    } else {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
      setTimeout(() => {
        this.isUp()
      }, 1000);
    }
  }
  isUp() {
    this.openSnackBar()
  }
  updatingDatesAndNames() {
    this.Items[0].myItems.forEach(element => {
      let url = element.owner.url
      let now = new Date()
      let date = new Date(element.pushed_at)
      let daysAgo = Math.abs(now.getTime() - date.getTime());
      let days = Math.round(daysAgo / (60 * 60 * 24 * 1000))

      this.Items[0].dates.push(days)

      axios.get(url).then((data) => {
        if (data) {
          this.Items[0].names.push(data.data.name)
        } else {
          return "unknown"
        }
      }).catch(() => {
        console.log("error");

      })

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
          console.log(this.GithubUrl + myPage);

          this.Items[0].myItems = this.Items[0].myItems.concat(data.data.items)

          this.notScroll = true
        })
        .catch(() => {
          console.log("error");

        }).then(() => {

          this.updatingDatesAndNames()



        });




    }

  }


}

