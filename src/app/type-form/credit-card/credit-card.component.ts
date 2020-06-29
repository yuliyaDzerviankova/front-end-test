import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../user.service';
import {PersonalData} from '../../personalData';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.sass']
})
export class CreditCardComponent implements OnInit {

  user: PersonalData;
  ngForm: NgForm;
  creditForm: FormGroup;
  cardType: Array<{ id: number, value: string }>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.cardType = [
      {id: 0, value: 'Дебетовая'},
      {id: 1, value: 'Кредитная'}
    ];

    this.getUser();
  }

  getUser() {
    this.userService.getUser().subscribe((user: PersonalData) => {
      if (user) {
        // console.log(user);
        // this.creditForm = this.fb.group({
        //   ...user,
        //   cardType: this.cardType.filter(({id, value}) => value === String(user.cardType)),
        // });
        this.user = {
          ...user,
          cardType: this.cardType.find(({id, value}) => value === String(user.cardType))
        };
      } else {
        this.user = {
          cardNumber: '',
          cardExpiryDate: '',
          cardCode: '',
          cardType: this.cardType[0]
        };
        // this.creditForm = this.fb.group({
        //   cardNumber: ['', [
        //     Validators.required,
        //     Validators.minLength(12),
        //     Validators.maxLength(20),
        //     this.validateNumber
        //   ]],
        //   cardExpiryDate: ['', [
        //     Validators.required,
        //     this.validateDateCard
        //   ]],
        //   cardCode: ['', [
        //     Validators.required,
        //     Validators.maxLength(3)
        //   ]],
        //   cardType: [this.cardType[0], Validators.required]
        // });
      }
    });
  }

  validateNumber(number: FormControl) {
    const numberCard = /(\d{4}([\s]|)\d{4}([\s]|)\d{4}([\s]|)\d{4})/;
    // if (event.target) {
    number.value.split(/(?=.{4}$)/).join(' ');
    // }

    // return numberCard.test(number.value)
    //   ? null
    //   : {
    //     validateInput: {
    //       valid: false,
    //     },
    //   };
  }

  validateDateCard(expiryDate: FormControl) {
    const monthAndYear = /^(0[0-1]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

    return monthAndYear.test(expiryDate.value)
      ? null
      : {
        validateInput: {
          valid: false,
        },
      };
  }

  onSubmit(user) {
    const personalData = {
      ...this.user,
      cardNumber: user.cardNumber,
      cardExpiryDate: user.cardExpiryDate,
      cardCode: +user.cardCode,
      cardType: user.cardType
    };
    this.userService.setUser(personalData);
    this.router.navigate(['typeForm/result']);

  }
}
