import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {PersonalComponent} from './type-form/personal/personal.component';
import {ResultComponent} from './type-form/result/result.component';
import {CreditCardComponent} from './type-form/credit-card/credit-card.component';
import {TypeFormComponent} from './type-form/type-form.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {
    path: 'typeForm', component: TypeFormComponent, children: [
      {path: 'personal', component: PersonalComponent},
      {path: 'creditCard', component: CreditCardComponent},
      {path: 'result', component: ResultComponent},
    ]
  },
  {path: '', redirectTo: 'register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
