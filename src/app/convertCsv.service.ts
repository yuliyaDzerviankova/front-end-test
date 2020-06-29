import {Injectable} from '@angular/core';

@Injectable()
export class ConvertCsvService {

  static downloadFile(data, filename = 'data') {
    const csvData = this.convertToCsv(data, [
      'name',
      'surname',
      'middleName',
      'birthDate',
      'gender',
      'country',
      'address',
      'maidenName',
      'bankCodeName',
      'howKnow',
      'friendEmail',
      data.gender === 'Мужской' ? 'girlfriendPhone' : 'boyfriendPhone',
      data.gender === 'Мужской' ? 'footballTeam' : 'firmOfPan',
      'cardNumber',
      'cardExpiryDate',
      'cardCode',
      'cardType'
    ]);
    const blob = new Blob(['\ufeff' + csvData], {type: 'text/csv;charset=utf-8'});
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${filename}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static convertToCsv(objectArray, headerList) {
    const array = typeof objectArray !== 'object' ? JSON.parse(objectArray) : objectArray;
    let str = '';
    let row = '№,';

    headerList.forEach(element => {
      row += element + ',';
    });
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      headerList.forEach(element => {
        const head = element;
        line += ',' + array[i][head];
      });
      str += line + '\r\n';
    }
    return str;
  }
}
