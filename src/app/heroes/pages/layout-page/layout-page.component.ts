import { Component } from '@angular/core';
import { SideBarComponent } from '../../../../../../04-countryApp/src/app/shared/components/side-bar/side-bar.component';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sideBarItems=[
    //se definen opciones del menú y las url estan definidas en el router
    {label:'Listado',icon:'label',url:'./list'},
    {label:'Añadir',icon:'add',url:'./new-hero'},
    {label:'Buscar',icon:'search',url:'./search'},
  ]

}
