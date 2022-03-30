import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'map-overlay-preloader',
  templateUrl: './overlay-preloader.component.html',
  styleUrls: ['./overlay-preloader.component.scss']
})
export class OverlayPreloaderComponent implements OnInit {

  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

}
