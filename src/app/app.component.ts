import {Component, OnInit} from '@angular/core';
import {AppStateService} from "./services/core/app-state.service";
import {AppInitializerProvider} from "./services/core/app-initializer-provider.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    readonly appInitializerProvider: AppInitializerProvider,
    readonly appState: AppStateService
  ) {
  }

  ngOnInit(): void {
    console.log('app initializer injected', this.appInitializerProvider);
  }
}
