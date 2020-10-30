import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-animal-animal-modify',
  templateUrl: './animal-modify.component.html',
  styleUrls: ['./animal-modify.component.scss']
})
export class AnimalAnimalModifyComponent implements OnInit {

  animalID : number = 0;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.animalID = params['id'];
    });
  }


}
