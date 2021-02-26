import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConvertingWatchersPipe } from './converting-watchers.pipe';
import { LastElementPipe } from './last-element.pipe';

@NgModule({
  declarations: [
    AppComponent, MainComponent, ConvertingWatchersPipe, LastElementPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
