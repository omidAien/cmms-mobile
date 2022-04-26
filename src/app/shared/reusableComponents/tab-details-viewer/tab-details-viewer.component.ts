import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SystemInformation } from '../../appModels';
import { ResourceMainStore } from '../../ResourceManager/resourseMainStore';
import { LoadingService } from '../../services/loading.service';
import { HandleSessionstorage } from '../../SharedClasses/HandleSessionStorage';
import { faTriangleExclamation, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'map-tab-details-viewer',
  templateUrl: './tab-details-viewer.component.html',
  styleUrls: ['./tab-details-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabDetailsViewerComponent implements OnInit {

  sampleTabData: { Label:string; Content: { Barcode: string; Detail: { Caption: string; Value: string }[] }[] }[] = [

    { Label: "آمار سریالی", Content: [
      { Barcode: "000000000000", Detail: [
        {
          Caption: "رنگ",
          Value: "قرمز"
        },
        {
          Caption: "ضخامت",
          Value: "56 میلی متر"
        }] 
      },
      { Barcode: "000001100000", Detail: [
        {
          Caption: "رنگ",
          Value: "آبی"
        },
        {
          Caption: "ضخامت",
          Value: "56 میلی متر"
        }] 
      }] 
    },
    { Label: "آمار تجمعی", Content: [
      { Barcode: "000000000000", Detail: [
        {
          Caption: "رنگ",
          Value: "قرمز"
        },
        {
          Caption: "ضخامت",
          Value: "56 میلی متر"
        },
        {
          Caption: "تعداد",
          Value: "36"
        }] 
      },
      { Barcode: "000001100000", Detail: [
        {
          Caption: "رنگ",
          Value: "آبی"
        },
        {
          Caption: "ضخامت",
          Value: "56 میلی متر"
        },
        {
          Caption: "تعداد",
          Value: "36"
        }] 
      }] 
    }
  ];

  faTriangleExclamationIcon: IconDefinition = faTriangleExclamation;
  tabData$: Observable<{ Label:string; Content: { Barcode: string; Detail: { Caption: string; Value: string }[] }[] }[]> = of(this.sampleTabData);
  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;
  noDataMessage: string;

  constructor(private loadingService: LoadingService,
              private resourceMainStore: ResourceMainStore,
              private handleSessionstorage: HandleSessionstorage) { }

  ngOnInit(): void {

    this.getPageInfo();
    
    this.setNoDataMessageTextHandler();

    this.tabData$ = this.loadingService.showPreLoaderUntilCompleted(this.tabData$, true, 500);

  }

  getPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

  setNoDataMessageTextHandler() {

    this.resourceMainStore.culture = this.pageInfo.Culture;

    this.noDataMessage = this.resourceMainStore.getNoDataForRepresentationTextResource();

  }

}
