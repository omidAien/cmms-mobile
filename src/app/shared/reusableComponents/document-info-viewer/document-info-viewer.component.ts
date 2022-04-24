import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ResourceMainStore } from '../../ResourceManager/resourseMainStore';

@Component({
  selector: 'map-document-info-viewer',
  templateUrl: './document-info-viewer.component.html',
  styleUrls: ['./document-info-viewer.component.scss']
})
export class DocumentInfoViewerComponent implements OnInit {

  @Output() formOutputHandler = new EventEmitter<FormGroup>();

  documentTitleInfo: { number: string; date: string, fieldLabel: string };
  formAppearance: string = "outline";
  documentForm: FormGroup;

  constructor(private resourceMainStore: ResourceMainStore) { }

  ngOnInit(): void {

    this.setDocumentInfo();

    this.formGenerator();

  }

  setDocumentInfo() {

    this.documentTitleInfo = {
      number: this.resourceMainStore.getDocumentNumberTextResource(),
      date: this.resourceMainStore.getDocumentDateTextResource(),
      fieldLabel: this.resourceMainStore.getDocumentDescriptionFieldLabelTextResource()
    };

  }

  formGenerator() {

    this.documentForm = new FormGroup({
      description: new FormControl('')
    });

    this.formOutputHandler.emit(this.documentForm);

  }

}
