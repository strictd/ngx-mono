import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MetaGuard } from '@ngx-meta/core';

import { CodeComponent } from '../views/code/code';
import { ContactComponent } from '../views/contact/contact';
import { HomepageComponent } from '../views/homepage/homepage';
import { PageNotFoundComponent } from '../views/page-not-found/page-not-found';
import { PeopleComponent } from '../views/people/people';

const routes: Routes = [
  { path: '', component: HomepageComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Strict Development, Inc',
        description: 'Custom App using Angular'
      }
    }
  },
  { path: 'code', component: CodeComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Code | Strict Development, Inc',
        description: 'Custom Apps using Angular'
      }
    }
  },
  { path: 'people', component: PeopleComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'People | Strict Development, Inc',
        description: 'People of Strict Development'
      }
    }
  },
  { path: 'contact', component: ContactComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Contact | Strict Development, Inc',
        description: 'Get A hold of us'
      }
    }
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export let appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
