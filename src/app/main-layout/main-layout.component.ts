import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HomeHeader } from "../shared/home-header/home-header";
import { HomeFooter } from "../shared/home-footer/home-footer";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, HomeHeader, HomeFooter],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

}
