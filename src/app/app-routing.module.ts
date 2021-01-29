import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicDetailsFormComponent } from './basic-details-form/basic-details-form.component';
import { CanActivateCardDetailsFormGuard } from './can-activate-card-details-form.guard';
import { CardDetailsFormComponent } from './card-details-form/card-details-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basic-details-form', component: BasicDetailsFormComponent },
  {
    path: 'card-details-form',
    component: CardDetailsFormComponent,
    canActivate: [CanActivateCardDetailsFormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
