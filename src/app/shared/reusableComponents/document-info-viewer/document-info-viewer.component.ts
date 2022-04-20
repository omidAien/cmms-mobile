import { Component, OnInit } from '@angular/core';
import { ResourceMainStore } from '../../ResourceManager/resourseMainStore';

@Component({
  selector: 'map-document-info-viewer',
  templateUrl: './document-info-viewer.component.html',
  styleUrls: ['./document-info-viewer.component.scss']
})
export class DocumentInfoViewerComponent implements OnInit {

  documentTitleInfo: { number: string; date: string };

  constructor(private resourceMainStore: ResourceMainStore) { }

  ngOnInit(): void {

    this.setDocumentInfo();

  }

  setDocumentInfo() {

    this.documentTitleInfo = {
      number: this.resourceMainStore.getDocumentNumberTextResource(),
      date: this.resourceMainStore.getDocumentDateTextResource()
    };

  }

}
