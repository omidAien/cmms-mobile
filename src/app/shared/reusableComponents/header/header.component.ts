import { Component, Input, OnInit } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';

@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() pageDirection: string;

  constructor(public headerInfoService: HeaderInfoService) { }

  ngOnInit(): void {}

}
