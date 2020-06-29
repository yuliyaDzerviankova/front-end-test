import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  typesRegister: Array<{
    id: number;
    value: string;
  }>;
  typeRegister: { id: number, value: string };
  nameFile: string;

  text: any;
  JSONData: any;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.typesRegister = [{
      id: 0,
      value: 'Персональная'
    }, {
      id: 1,
      value: 'Регистрация пользователей списком'
    }];
  }

  uploadList(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.addEventListener('change', event => {
      const target = event.target as HTMLInputElement;
      const selectedFile = target.files[0];
      const uploadData = new FormData();
      uploadData.append('upload_file', selectedFile, selectedFile.name);
      this.nameFile = selectedFile.name;
      this.convertFile(selectedFile);
    });

    fileInput.click();
  }

  csvJSON(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length - 1; i++) {
      const obj = {};
      const currentLine = lines[i].split(',');
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
    this.JSONData = JSON.stringify(result);
  }

  convertFile(input) {
    const reader = new FileReader();
    reader.readAsText(input);
    reader.onload = () => {
      const text = reader.result;
      this.text = text;
      this.csvJSON(text);
    };
  }

  navigate() {
    if (this.typeRegister?.id === 0) {
      this.route.navigate(['typeForm/personal']);
    } else if (this.typeRegister?.id === 1) {
      sessionStorage.setItem('fromCsv', this.JSONData);
      this.route.navigate(['typeForm/result']);
    } else {
      this.route.navigate(['/']);
    }
  }
}
