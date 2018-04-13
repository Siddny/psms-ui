import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';

const appRoute: Routes = [
	{
		path: '',
		component: AppComponent,
	},
	{
		path: 'camera/:id',
		component: DetailsComponent,
	},
	{
		path: 'home',
		component: MainComponent,
	}
]


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);

