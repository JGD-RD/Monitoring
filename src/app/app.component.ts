// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'monitoring2';
// }



// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-root',
//   template: `<h1>Tracing Angular API Call</h1>`,
// })
// export class AppComponent {
//   constructor(private http: HttpClient) {
//     this.http.get('http://localhost:3000/api/test').subscribe(res => {
//       console.log('Backend response:', res);
//     });
//   }
// }

import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `<button (click)="callApi()">Call API</button>`
})
export class AppComponent {
  constructor(private api: ApiService) {}

  callApi() {
    console.log('API started');
    this.api.getSampleData().subscribe(
      data => console.log('API Response:', data),
      error => console.error('API Error:', error)
    );
  }
}

