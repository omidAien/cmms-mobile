import { Component, DoCheck, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Observable, of } from 'rxjs';
import { SystemInformation } from '../../appModels';
import { LoadingService } from '../../services/loading.service';
import { HandleSessionstorage } from '../../SharedClasses/HandleSessionStorage';

@Component({
  selector: 'map-tab-details-viewer',
  templateUrl: './tab-details-viewer.component.html',
  styleUrls: ['./tab-details-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabDetailsViewerComponent implements OnInit {

  sampleTabData: { Label:string; Content: string }[] = [
    { Label: "آمار سریالی", Content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat pretium nibh ipsum consequat nisl. Tempor id eu nisl nunc mi ipsum faucibus vitae. Vestibulum lectus mauris ultrices eros in cursus turpis massa. Tempor nec feugiat nisl pretium fusce id velit ut. Porta lorem mollis aliquam ut porttitor leo a diam. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Ut tortor pretium viverra suspendisse potenti nullam ac. Donec enim diam vulputate ut pharetra. Gravida quis blandit turpis cursus. Imperdiet proin fermentum leo vel orci porta non. Ac feugiat sed lectus vestibulum mattis. Amet nulla facilisi morbi tempus iaculis. Nulla pharetra diam sit amet nisl. Auctor neque vitae tempus quam pellentesque.

    Id aliquet lectus proin nibh nisl condimentum id venenatis. Cras semper auctor neque vitae tempus quam. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu. Ut tellus elementum sagittis vitae et. Blandit massa enim nec dui nunc mattis. Arcu vitae elementum curabitur vitae nunc. Morbi enim nunc faucibus a pellentesque sit amet. Auctor urna nunc id cursus. Ut venenatis tellus in metus vulputate. Blandit massa enim nec dui.
    
    At urna condimentum mattis pellentesque id nibh tortor id. Turpis egestas integer eget aliquet nibh praesent. At tellus at urna condimentum mattis pellentesque. Nisi lacus sed viverra tellus in hac habitasse platea dictumst. Eu non diam phasellus vestibulum lorem sed risus. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Est ullamcorper eget nulla facilisi. Euismod lacinia at quis risus sed vulputate odio. Ipsum consequat nisl vel pretium lectus quam id. Consectetur purus ut faucibus pulvinar. Semper auctor neque vitae tempus quam pellentesque nec. Semper viverra nam libero justo laoreet sit amet cursus sit. Nunc mattis enim ut tellus elementum sagittis vitae et.
    
    In ante metus dictum at tempor commodo ullamcorper a. Felis imperdiet proin fermentum leo. Fermentum leo vel orci porta non pulvinar neque. Vel pharetra vel turpis nunc. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Tellus mauris a diam maecenas sed enim ut. Nullam vehicula ipsum a arcu cursus vitae congue. Adipiscing elit duis tristique sollicitudin. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Et malesuada fames ac turpis. Eget arcu dictum varius duis at consectetur lorem donec massa. Nibh tellus molestie nunc non. Cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque felis. Amet commodo nulla facilisi nullam vehicula. Suspendisse interdum consectetur libero id faucibus. Sit amet commodo nulla facilisi.
    
    Lectus proin nibh nisl condimentum id. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Pellentesque adipiscing commodo elit at. Tincidunt id aliquet risus feugiat in ante. Placerat orci nulla pellentesque dignissim enim. Vel pretium lectus quam id leo in vitae turpis. Ac turpis egestas integer eget aliquet nibh. Et odio pellentesque diam volutpat commodo sed egestas egestas. Penatibus et magnis dis parturient montes nascetur ridiculus mus. Id neque aliquam vestibulum morbi blandit. Lobortis scelerisque fermentum dui faucibus in ornare. Eu consequat ac felis donec et odio pellentesque diam volutpat.` },
    { Label: "آمار تجمعی", Content: "Content Two" },
    { Label: "خطا", Content: "Content Three" },
  ];

  tabData$: Observable<{ Label:string; Content: string }[]>;
  pageInfo: Pick<SystemInformation, "Direction" | "Culture">;

  @ViewChild("matTabGroup") matTabGroup: MatTabGroup;

  constructor(private loadingService: LoadingService,
              private handleSessionstorage: HandleSessionstorage) { }

  ngOnInit(): void {

    this.getPageInfo();
    
    this.tabData$ = this.loadingService.showPreLoaderUntilCompleted(of(this.sampleTabData), true, 1000);

  }

  getPageInfo() {

    this.pageInfo = this.handleSessionstorage.get("pageInfo");

  }

}
