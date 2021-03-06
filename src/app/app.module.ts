import { 
        NgModule, 
        CUSTOM_ELEMENTS_SCHEMA, 
        forwardRef ,
        NO_ERRORS_SCHEMA,
        } from '@angular/core';  

//material imports
import { MatCardModule }     from '@angular/material/card';
import { MatTabsModule }     from '@angular/material/tabs';
import { MatTableModule}     from '@angular/material/table';
import { MatSidenavModule }  from '@angular/material/sidenav';
import { MatIconModule }     from '@angular/material/icon';
import { MatToolbarModule }  from '@angular/material/toolbar';
import { MatListModule }     from '@angular/material/list';
import { MatButtonModule }   from '@angular/material/button';
// import { MatInputModule }    from '@angular/material/input';
import { MatInputModule }    from '@angular/material';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatExpansionModule }from '@angular/material/expansion';
import { MatDatepickerModule }from '@angular/material/datepicker';
import { MatSelectModule }   from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { MatStepperModule } from '@angular/material/stepper';
import { 
        MatNativeDateModule, 
        MatFormFieldModule 
        } from '@angular/material';
import { 
        FormsModule, 
        ReactiveFormsModule, 
        ControlValueAccessor, 
        NG_VALUE_ACCESSOR,
        } from '@angular/forms';

import { AppComponent } from './app.component';

import { routing } from './app.routing';

//services
import { ServiceService } from './services/service.service';
import { AssetsService } from './services/assets/assets.service';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { 
    DetailsComponent,
    CameraDetails,
    UpdateCameraDetails,
    NewCamUnit,
    } from './pages/details/details.component';
import { 
    MainComponent, 
    NewCamType,
    } from './pages/main/main.component';


import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AssetsComponent } from './components/assets/assets.component';
import { 
    ProjectsComponent,
    NewProjectDialog,
    } from './components/projects/projects.component';
import { 
    ProjectDetailsComponent,
    CrewMemberDialog,
    } from './components/project-details/project-details.component';

// import { htmlToPdfSave } from 'angular-save-html-to-pdf';

@NgModule({ 
  declarations: [
    AppComponent,
    DetailsComponent,
    MainComponent,
    NewCamType,
    CameraDetails,
    UpdateCameraDetails,
    NewCamUnit,
    AssetsComponent,
    ProjectsComponent,
    NewProjectDialog,
    ProjectDetailsComponent,
    CrewMemberDialog,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatStepperModule,
    NgxChartsModule,
    MatChipsModule,
    routing,
    MatCheckboxModule,
  ],
  providers: [ 
    ServiceService,
    AssetsService,
  ],
  bootstrap: [AppComponent],
  schemas:[ 
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    NewCamType,
    CameraDetails,
    UpdateCameraDetails,
    NewCamUnit,
    NewProjectDialog,
    CrewMemberDialog,
  ]
})
export class AppModule { }
