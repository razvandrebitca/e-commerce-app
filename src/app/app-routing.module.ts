import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren:()=> import( './pages/home/home.module').then(m=> m.HomeComponentModule),
  },
  {
    path: 'list',
    loadChildren: ()=>import('./pages/list/list.module').then(m=>m.ListComponentModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
