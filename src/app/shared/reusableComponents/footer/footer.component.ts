import { Component, OnInit } from '@angular/core';
import { faArrowRightFromBracket, IconDefinition, faGear, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'map-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faArrowRightFromBracketIcon: IconDefinition = faArrowRightFromBracket;
  faGearIcon: IconDefinition = faGear;
  faHouseIcon: IconDefinition = faHouse;

  constructor() { }

  ngOnInit(): void {
  }

  iconClick(event:any, iconOperation:string): void {

    const eventTarget = event.target;

    // 1. rest 
    const footerElement = eventTarget.closest("footer") as HTMLElement;
    const allIcons = footerElement.querySelectorAll("fa-icon");
    allIcons.forEach((faIcon) => faIcon.classList.remove("fa-icon-active"));

    // 2. imply
    const faIconElement: HTMLElement = eventTarget.closest("fa-icon") ? eventTarget.closest("fa-icon") : eventTarget.querySelector("fa-icon");
    const iconOperationExtracted:string = faIconElement.dataset.iconOperation;

    if ( iconOperationExtracted === iconOperation ) {

      faIconElement.classList.add("fa-icon-active");

    }

  }

}
