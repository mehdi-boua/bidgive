import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.component.html',
  styleUrls: ['./prehome.component.scss']
})
export class PrehomeComponent {  
constructor(private router: Router){}

/*redirectHome(){
  this.router.navigate(['/home']);
}*/

  ngOnInit() {
    setTimeout(() => { this.progress(); }, 300);
  }

  value: number = 0;
  interval: NodeJS.Timer | undefined;

  progress() {
    const progressbar = document.querySelector(".prehome__progress");
    const bar = document.querySelector(".prehome__bar");
    const barWidth: number = parseInt(window.getComputedStyle(bar!).width, 10);
    console.log(bar);

    console.log(barWidth);

    this.interval = setInterval(() => {
      this.value++;
      if (this.value >= barWidth) {
        clearInterval(this.interval);
        setTimeout(() => { this.router.navigate(['/home']); }, 300);
      }
      progressbar!.setAttribute("style", "width :" + this.value + "px");
    }, 10)
  }
}
