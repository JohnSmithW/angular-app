import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' }, // Перенаправление на страницу логина
  { path: 'auth', component: AuthComponent },
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }