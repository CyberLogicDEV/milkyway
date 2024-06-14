import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';

const routes: Routes = [
    {
        path: '',
        component: IntroComponent,
    },
    {
        path: 'battle',
        loadChildren: () => import('./components/game/game.module').then((mod) => mod.GameModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
