import { Component, EventEmitter, Input } from '@angular/core';
import { JsonInterface } from '../jsonInterface';
import { CommonModule } from '@angular/common';
import {ItemDetailsComponent} from '../item-details/item-details.component'


@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [CommonModule,ItemDetailsComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {

  @Input() listItems! : JsonInterface[];
  public groupedListItems : {[key in string]: JsonInterface[]}={};
  public showItems: {[key in string]: boolean} = {};
  public itemSelected = new EventEmitter<JsonInterface>();

  ngOnInit() { 
    this.groupedListItems=  this.listItems.reduce((acc:{[key in string]: JsonInterface[]}, curr) => {
    const type = curr.Type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(curr);
    return acc;
  }, {})

}

public getGroupedListItemsKeys(){
  return Object.keys(this.groupedListItems);
  
}

public selectedItem: JsonInterface | null = null;

toggleItems(key: string) {
  this.showItems[key] = !this.showItems[key];
}
toggleItem(selectedItem : JsonInterface){
  this.itemSelected.emit(selectedItem); 
  this.selectedItem = selectedItem; 
}

getCountList(key: string){
   return this.groupedListItems[key].length;
}
  
trackByItem(index: number, item: JsonInterface) {
  return item.imdbID; 
}

}
