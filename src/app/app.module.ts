import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { ProjectsComponent } from './pages/projects/projects.component';

// Ajoutez les modules d'Angular Material ici
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';  // Si vous utilisez des boutons Material

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxTypedJsModule,
    FormsModule,
    // Ajoutez les modules Angular Material à l'importation
    MatPaginatorModule,  // Pagination
    MatInputModule,      // Barre de recherche
    MatButtonModule      // Boutons Material (si nécessaire)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
