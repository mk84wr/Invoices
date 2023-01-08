import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./components/categories/categories.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { UsersComponent } from "./components/users/users.component";
import { AdministratorGuard } from "./guards/administrator.guard";
import { GuestGuard } from "./guards/guest.guard";
import { UserGuard } from "./guards/user.guard";

const routes: Routes =[
    {path:'', redirectTo: '/faktury', pathMatch:'full'},
    {path: 'faktury', component: InvoicesComponent, canActivate:[UserGuard]},
    {path: 'kontrahenci', component: CustomersComponent,canActivate:[UserGuard]},
    {path: 'kategorie', component: CategoriesComponent,canActivate:[UserGuard]},
    {path: 'uzytkownicy', component:UsersComponent, canActivate:[AdministratorGuard]},
    {path: 'logowanie', component: LoginComponent, canActivate:[GuestGuard]},
    {path: '**', component:PageNotFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}