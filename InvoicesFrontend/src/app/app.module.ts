import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories.component';
import { HttpInvoicesService } from './api/http-invoices.service';
import { HttpCategoriesService } from './api/http-categories.service';
import { CustomersComponent } from './components/customers/customers.component';
import { HttpCustomersService } from './api/http-customers.service';
import { HttpUsersService } from './api/http-users.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListOfInvoicesComponent } from './components/common/list-of-invoices/list-of-invoices.component';
import { InvoiceComponent } from './components/common/list-of-invoices/invoice/invoice.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ListOfCustomersComponent } from './components/common/list-of-customers/list-of-customers.component';
import { ListOfCategoriesComponent } from './components/common/list-of-categories/list-of-categories.component';
import { CustomerComponent } from './components/common/list-of-customers/customer/customer.component';
import { CategoryComponent } from './components/common/list-of-categories/category/category.component';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { AddInvoiceComponent } from './components/invoices/add-invoice/add-invoice.component';
import { EditCategoryComponent } from './components/common/list-of-categories/edit-category/edit-category.component';
import { EditCustomerComponent } from './components/common/list-of-customers/edit-customer/edit-customer.component';
import { ListOfUsersComponent } from './components/common/list-of-users/list-of-users.component';
import { UserComponent } from './components/common/list-of-users/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/common/list-of-users/edit-user/edit-user.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettleInvoiceComponent } from './components/common/list-of-invoices/settle-invoice/settle-invoice.component';
import { EditInvoiceComponent } from './components/common/list-of-invoices/edit-invoice/edit-invoice.component';
import { LoginComponent } from './components/login/login.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InvoiceFilterComponent } from './components/invoices/invoice-filter/invoice-filter.component';
import { CustomerFilterComponent } from './components/customers/customer-filter/customer-filter.component';
import { CustomerInvoicesComponent } from './components/common/list-of-customers/customer-invoices/customer-invoices.component';
import { CustomerInvoicesFilterComponent } from './components/common/list-of-customers/customer-invoices/customer-invoices-filter/customer-invoices-filter.component';
import { CategoryInvoicesComponent } from './components/common/list-of-categories/category/category-invoices/category-invoices.component';
import { CategoryInvoicesFilterComponent } from './components/common/list-of-categories/category/category-invoices-filter/category-invoices-filter.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/header/navbar/navbar.component';
import { UserPanelComponent } from './components/header/navbar/user-panel/user-panel.component';
import { UpdateDateComponent } from './components/header/navbar/update-date/update-date.component';
import { PasswordChangeComponent } from './components/header/navbar/password-change/password-change.component';
import { InvoiceDetailsComponent } from './components/common/list-of-invoices/invoice-details/invoice-details.component';
import { DisplayComponent } from './components/header/display/display.component';
import { CustomerDetailsComponent } from './components/common/list-of-customers/customer/customer-details/customer-details.component';
import { ResetComponent } from './components/login/reset/reset.component';
import { ConfirmationComponent } from './components/common/confirmation/confirmation.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent, CategoriesComponent,  CustomersComponent, InvoiceComponent, ListOfInvoicesComponent, 
    InvoicesComponent, ListOfCustomersComponent, ListOfCategoriesComponent, CustomerComponent, CategoryComponent, 
    AddCategoryComponent, AddCustomerComponent, AddInvoiceComponent, EditCategoryComponent, EditCustomerComponent,
      ListOfUsersComponent, UserComponent, UsersComponent, EditUserComponent, AddUserComponent, SettleInvoiceComponent, 
      EditInvoiceComponent, LoginComponent, PageNotFoundComponent, InvoiceFilterComponent, CustomerFilterComponent,  
      CustomerInvoicesComponent, CustomerInvoicesFilterComponent, CategoryInvoicesComponent, CategoryInvoicesFilterComponent,
       NavbarComponent, UserPanelComponent, UpdateDateComponent, PasswordChangeComponent, HeaderComponent, InvoiceDetailsComponent, DisplayComponent, CustomerDetailsComponent, ResetComponent, ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}, HttpInvoicesService,HttpCategoriesService,HttpCustomersService, HttpUsersService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],  
  bootstrap: [AppComponent]
})
export class AppModule { }
