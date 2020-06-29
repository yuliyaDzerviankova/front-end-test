import {Component, OnInit} from '@angular/core';
import {FormBuilder, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserService} from '../../user.service';
import {PersonalData} from '../../personalData';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.sass']
})

export class PersonalComponent implements OnInit {

  user: PersonalData;
  ngForm: NgForm;
  countries: Array<{ id: number, value: string }>;
  genders: Array<{ id: number, value: string }>;
  footballTeams: Array<{ id: number, value: string }>;
  pans: any;
  male = false;
  female = false;
  isValid: boolean;
  selectedPan: { id: number, name: string };
  isOpen: boolean;
  isOpenCountry: boolean;
  isOpenPan: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.isValid = false;
    this.countries = [
      {id: 0, value: 'Беларусь'},
      {id: 1, value: 'Россия'},
      {id: 2, value: 'Украина'},
      {id: 3, value: 'Франция'},
      {id: 4, value: 'Германия'},
      {id: 5, value: 'Польша'},
      {id: 6, value: 'Литва'},
    ];

    this.genders = [
      {id: 0, value: 'Мужской'},
      {id: 1, value: 'Женский'}
    ];

    this.footballTeams = [
      {id: 0, value: 'ФК Гомель'},
      {id: 1, value: 'БАТЭ (Борисов)'},
      {id: 2, value: 'Динамо (Брест)'},
      {id: 3, value: 'Шахтер (Солигорск)'},
      {id: 4, value: 'Неман (Гродно)'},
      {id: 5, value: 'Динамо (Минск)'},
      {id: 6, value: 'Ислочь (Минский р-он)'},
      {id: 7, value: 'Слуцк'},
      {id: 8, value: 'Энергетик-БГУ (Минск)'},
      {id: 9, value: 'Славия (Мозырь)'},
      {id: 10, value: 'Белшина (Бобруйск)'},
    ];
    this.getUser();
    this.http.get('assets/pans.json').subscribe(data => {
      this.pans = data;
      this.selectedPan = data[0];
    });
  }

  getUser() {
    this.userService.getUser().subscribe((user: PersonalData) => {
      if (user) {
        this.user = {
          ...user,
          gender: this.genders.find(({id, value}) => value === String(user.gender)),
          country: this.countries.find(({id, value}) => value === String(user.country))
        };
      } else {
        this.user = {
          name: '',
          surname: '',
          middleName: '',
          birthDate: '',
          gender: this.genders[0],
          country: this.countries[0],
          address: '',
          maidenName: '',
          bankCodeName: '',
          howKnow: '',
          friendEmail: '',
          girlfriendPhone: '',
          footballTeam: this.footballTeams[0],
          boyfriendPhone: '',
          firmOfPan: this.pans && this.pans[0]
        };
      }
    });
  }

  ngDoCheck() {
    if (this.user.gender.id === 0) {
      this.male = true;
      this.female = false;
    } else if (this.user.gender.id === 1) {
      this.male = false;
      this.female = true;
    }
  }

  validatePhoneNumber(number) {
    const phone = /^\W[0-9]{12}/;
    return phone.test(number)
      ? null
      : {
        validateInput: {
          valid: false,
        },
      };
  }

  setIsOpen() {
    this.isOpen = !this.isOpen;
    this.isOpenCountry = false;
    this.isOpenPan = false;
  }

  setIsOpenCountry() {
    this.isOpenCountry = !this.isOpenCountry;
    this.isOpen = false;
    this.isOpenPan = false;
  }

  setIsOpenPan() {
    this.isOpenPan = !this.isOpenPan;
    this.isOpenCountry = false;
    this.isOpen = false;
  }

  selectTeam(value) {
    this.user.footballTeam = value;
    this.isOpen = false;
  }

  selectCountry(value) {
    this.user.country = value;
    this.isOpenCountry = false;
  }

  selectPan(value) {
    this.user.firmOfPan = value;
    this.selectedPan = value;
    this.isOpenPan = false;
  }

  onSubmit(user) {
    const data = {
      ...this.user,
      girlfriendPhone: user.gender.id === 0 ? user.girlfriendPhone : undefined,
      footballTeam: user.gender.id === 0 ? user.footballTeam : undefined,
      boyfriendPhone: user.gender.id === 1 ? user.boyfriendPhone : undefined,
      firmOfPan: user.gender.id === 1 ? user.firmOfPan : undefined,
    };
    this.userService.setUser(data);
    this.router.navigate(['typeForm/creditCard']);
  }
}
