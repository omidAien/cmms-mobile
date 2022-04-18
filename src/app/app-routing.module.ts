import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/AuthLogic/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import("./account/account.module").then((m) => m.AccountModule)
  },
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: "swcomp",
    loadChildren: () => import("./switcher/switcher.module").then((m) => m.SwitcherModule),
    canActivate: [AuthGuard]
  },
  {
    path: "", redirectTo: "/account/login", pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/account/login",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
