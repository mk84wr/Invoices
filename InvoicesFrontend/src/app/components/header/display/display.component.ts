import { Component, Input, OnInit } from '@angular/core';
import { Update } from 'src/app/models/update';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  @Input()
  update:Partial<Update>={};
  constructor() { }

  ngOnInit(): void {
  }

}
