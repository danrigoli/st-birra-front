import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Meeting } from '../core/interfaces/meeting.interface';
import { User } from '../core/interfaces/user.interface';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.css']
})

export class MeetingCardComponent implements OnInit {

  @Input() meeting: Meeting = { 
    id: 0,
    title: '',
    dateFormatted: '',
    place: '',
    description: '',
    users: [],
    weather: {}
  };
  @Input() buttonText = 'Anotarse';
  @Input() buttonColor = 'success';
  @Input() isAdmin = false;
  @Input() showBeers = false;
  @Output() buttonEvent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  buttonPress(event: number) {
    this.buttonEvent.emit(event);
  }

  setIcon(){
    return `https://openweathermap.org/img/wn/${this.meeting.weather?.weather[0]?.icon}.png`
  }


  farToCel(far: number) {
    return Math.round((far - 32) * (5 / 9) * 100) / 100
  }

  getBeerBoxes() {
    const celsius = this.farToCel(this.meeting.weather.main?.temp ?? 24)
    let beers
    if (celsius < 20) beers = this.meeting.users.length * 0.75
    else if (celsius <= 24) beers = this.meeting.users.length
    else beers = this.meeting.users.length * 2
    
    return Math.ceil(beers / 6)
  }

  getImgTitle() {
    if (this.meeting.weather.main?.temp) return this.farToCel(this.meeting.weather.main.temp) + 'ºC'
    else return 'No pudimos tomar la temperatura del dia.'
  }
  getButtonColor() {
    return 'btn-' + this.buttonColor;
  }

}

