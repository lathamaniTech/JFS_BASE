import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  fname: string;
  myDate = new Date();
  pages: Array<{ title: string, component: any; icon: any }>;

  constructor(private router: Router) {
    this.pages = [
      { title: 'Home Page', component: '/JsfhomePage', icon: 'home' },
      { title: 'Existing Leads', component: '/ExistingPage', icon: 'document-text' },
      { title: 'Existing Applications', component: '/ExistApplicationsPage', icon: 'documents' },
      { title: 'Audit Log', component: '/auditLogs', icon: 'reader' },
    ];
  }

  async openPage(page) {
    if (this.pages[4])
      this.pages[4].title === page.title ? this.pages : this.pages.splice(4);
    if (page.title == 'Existing Leads') {
      this.router.navigate([page.component], {
        queryParams: {
          _leadStatus: 'online',
          user: "8855JFS",
          branch: localStorage.getItem('janaCenter'),
        },
      });
    } else {
      this.router.navigate([page.component], {
        queryParams: {
          _leadStatus: 'online',
          user: "8855JFS",
          branch: localStorage.getItem('janaCenter'),
        },
      });
    }
  }


  logout() {
    console.log("logout");
  }

  //vapt points
  //utility appConstants

}
