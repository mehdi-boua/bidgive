import { Component } from '@angular/core';

@Component({
  selector: 'app-page-mdp',
  templateUrl: './page-mdp.component.html',
  styleUrls: ['./page-mdp.component.scss']
})
export class PageMdpComponent {



  Envoi() {
    var pattern = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}$/i;

    if( pattern.test((document.getElementById('mail') as HTMLInputElement).value)) {
      document.getElementById('error')?.classList.add('hide');
      document.getElementById('send')?.classList.remove('hide');
    } else {
      document.getElementById('send')?.classList.add('hide');
      document.getElementById('error')?.classList.remove('hide');
    }
  }
}
