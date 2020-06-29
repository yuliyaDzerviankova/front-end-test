import {Component, OnInit} from '@angular/core';
import {PersonalData} from '../../personalData';
import {ConvertCsvService} from '../../convertCsv.service';
import {UserService} from '../../user.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {

  personalData: PersonalData;
  fromCsv: [{}];
  isShowCredit: boolean;
  isShowInfo: boolean;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private route: Router
  ) {
  }

  ngOnInit(): void {
    this.loadFromCsv();
    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((user: PersonalData) => this.personalData = user);
  }

  editData(data) {
    this.userService.setUser(data);
    this.route.navigate(['typeForm/personal']);
  }

  loadFromCsv() {
    if (sessionStorage.getItem('fromCsv')) {
      this.fromCsv = JSON.parse(sessionStorage.getItem('fromCsv'));
    }
  }

  transformCard(cardNumber) {
    return cardNumber.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }

  save() {
    const date = Date.now();
    const summary = {
      ...this.personalData,
      gender: this.personalData.gender.value,
      country: this.personalData.country.value,
      cardType: this.personalData.cardType.value
    };

    // send data
    // this.http.post('/api/user/', summary).subscribe(res => console.log(res));

    ConvertCsvService.downloadFile([summary], `jsontocsv_${date}`);
    sessionStorage.clear();
  }
}
