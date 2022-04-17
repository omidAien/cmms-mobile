import { Component, OnInit } from '@angular/core';
import { BarcodeInfoListService } from '../../services/barcode-info-list.service';

@Component({
  selector: 'map-barcode-info-list-viewer',
  templateUrl: './barcode-info-list-viewer.component.html',
  styleUrls: ['./barcode-info-list-viewer.component.scss']
})
export class BarcodeInfoListViewerComponent implements OnInit {

  constructor(public barcodeInfoListService: BarcodeInfoListService) { }

  ngOnInit(): void {
  }

}
