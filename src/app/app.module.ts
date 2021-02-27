import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './components/main/main.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ConvertingWatchersPipe } from './converting-watchers.pipe';
import { NgxSpinnerModule, } from 'ngx-spinner';


@NgModule({
  declarations: [
    AppComponent, MainComponent, ConvertingWatchersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, InfiniteScrollModule, NgxSpinnerModule, BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
