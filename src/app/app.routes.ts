import { Routes } from '@angular/router';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {AppComponent} from './app.component'


export const routes: Routes = [
    { path: "''", component: AppComponent },
    { path: "item", component: ItemDetailsComponent },
]
