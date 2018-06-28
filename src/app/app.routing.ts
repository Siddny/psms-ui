import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';
import { AssetsComponent } from './components/assets/assets.component';

const appRoute: Routes = [
	{
		path: 'app',
		component: AppComponent,
	},
	{
		path: 'camera/:id',
		component: DetailsComponent,
	},
	{
		path: '',
		component: MainComponent,
	},
	{
		path: 'assets',
		component: AssetsComponent,
	},
]

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoute);

