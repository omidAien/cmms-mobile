import { Component, Input, OnInit } from '@angular/core';
import { BarcodeInfoListService } from '../../services/barcode-info-list.service';

@Component({
  selector: 'map-barcode-info-list-viewer',
  templateUrl: './barcode-info-list-viewer.component.html',
  styleUrls: ['./barcode-info-list-viewer.component.scss']
})
export class BarcodeInfoListViewerComponent implements OnInit {

  @Input() barcodeInfoList: { Barcode: string; Detail: { Caption: string; Value: string }[] }[] = null;

  constructor(public barcodeInfoListService: BarcodeInfoListService) { }

  ngOnInit(): void {
  }

}
