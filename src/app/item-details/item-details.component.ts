import { Component, EventEmitter, Input ,Output} from '@angular/core';
import { JsonInterface } from '../jsonInterface';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import { SafeUrlPipe } from '../safe-url.pipe';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';




@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CommonModule,SafeUrlPipe,FormsModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent {
  
  @Input() item!: JsonInterface;

  @Output() newName = new EventEmitter<JsonInterface>();


  onSubmit() {
    this.newName.emit(this.item);
  }
  constructor(private route: ActivatedRoute) {}
 

  ngOnInit() {
     this.route.paramMap.subscribe( params=>{
      const itemString  = params.get('item');
      this.item = JSON.parse(itemString ??"" );
     }   
    );
  }

  getDate(date : string){
    date=date.replace(" ","");
    return moment(date).format('YYYY-MM-DD');
    }

}
