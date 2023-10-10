import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { IncrementInputComponent } from './views/increment-input/increment-input.component';
import { NavMenuComponent } from './views/nav-menu/nav-menu.component';
import { PlannerComponent } from './views/planner/planner.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRippleModule} from "@angular/material/core";
import { OutpostCardComponent } from './views/planner/outpost-card/outpost-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StructureCardComponent } from './views/planner/structure-card/structure-card.component';
import { FaqComponent } from './views/faq/faq.component';
import {CommonModule} from "@angular/common";
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    PlannerComponent,
    IncrementInputComponent,
    OutpostCardComponent,
    StructureCardComponent,
    FaqComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule,
        MatIconModule,
        MatTableModule,
        MatSelectModule,
        MatTooltipModule,
        MatCheckboxModule,
        FontAwesomeModule,
        RouterModule.forRoot([
          {path: '', component: PlannerComponent, pathMatch: 'full'},
          {path: 'faq', component: FaqComponent, pathMatch: 'full'},
        ]),
        BrowserAnimationsModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatRippleModule,
        MatSnackBarModule,
        FontAwesomeModule,
        CommonModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
