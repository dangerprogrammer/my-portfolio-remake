import { AfterViewInit, Component, ElementRef, ViewChildren } from '@angular/core';
import { BackgroundPageComponent } from './components/background-page/background-page.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './components/container/container.component';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BackgroundPageComponent, HeaderComponent, ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('scroll') scroll: ElementRef[] = [];

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);

    this.scroll.forEach(({ nativeElement: scroll }) => {
      gsap.from(scroll, {
        scale: 0, opacity: 0, stagger: .2, scrollTrigger: {
          trigger: scroll,
          pin: !0,
          start: 'top 50%',
          end: 'bottom bottom',
          scrub: !0
        }
      });

      gsap.to(scroll, {
        scale: 20, opacity: 0, stagger: .2, scrollTrigger: {
          trigger: scroll,
          pin: !0,
          start: 'top top',
          end: `+=${innerHeight}`,
          scrub: !0,
          onLeave: ({ trigger }) => gsap.to(trigger!, { scale: 1, opacity: 0 }),
          onEnterBack: ({ trigger }) => gsap.to(trigger!, { scale: 1, opacity: 0 })
        }
      });
    });
  }
}