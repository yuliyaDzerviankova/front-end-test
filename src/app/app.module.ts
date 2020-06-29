import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './shared/footer/footer.component';
import {HeaderComponent} from './shared/header/header.component';
import {RegisterComponent} from './register/register.component';
import {PersonalComponent} from './type-form/personal/personal.component';
import {TypeFormComponent} from './type-form/type-form.component';
import {CreditCardComponent} from './type-form/credit-card/credit-card.component';
import {ResultComponent} from './type-form/result/result.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {InputMaskDirective} from './type-form/credit-card/input-mask.directive';
import {ConvertCsvService} from './convertCsv.service';
import {UserService} from './user.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    PersonalComponent,
    TypeFormComponent,
    CreditCardComponent,
    ResultComponent,
    InputMaskDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    InputMaskDirective
  ],
  providers: [
    ConvertCsvService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
