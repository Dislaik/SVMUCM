import { jwtDecode } from "jwt-decode";
import { User } from "./architecture/model/user";

export class Utils {

  public static formatRUN(p1: HTMLInputElement): void {
    p1.value = p1.value.replace(/[^0-9kK]/g, '');

    if (p1.value.length > 9) {
        p1.value = p1.value.slice(0, 9);
    }

    const valor: string = p1.value.replace(/^0+|[^0-9kK]+/g, '');
    p1.value = valor;

    const number: string = valor.slice(0, -1);
    const dv: string = valor.slice(-1);

    if (number === '') {
        p1.value = valor;
    } else {
        const formattedNumber: string = isNaN(parseInt(number)) ? number : parseInt(number).toLocaleString('en').replace(/,/g, '.');
        p1.value = `${formattedNumber}-${dv}`;
    }
  }

  public static formatCLP(p1: HTMLInputElement): void {
    let value = p1.value.replace(/\./g, '').replace(/\D/g, '');
    
    p1.value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  public static stringToPrice(p1: string): string {
    const price = p1.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return price;
  }

  public static priceToNumber(p1: string): number {
    return Number(p1.replace(/\./g, '').replace(/\D/g, ''));
  }

  public static setStorage(p1: string, p2: any): void {
    window.localStorage.removeItem(p1);
    window.localStorage.setItem(p1, p2);
  }

  public static getStorage(p1: string): any | null {
    return window.localStorage.getItem(p1);
  }

  public static clearStorage(): void {
    window.localStorage.clear();
  }

  public static getUsernameByBrowser(): any {
    const token = this.getStorage('keyToken');

    if (token) {
      const decoded = jwtDecode(token);

      return decoded['username']
    }

    return null
  }

  public static convertToChileTime(date: Date | string, onlyDay: boolean): string {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        console.error("Fecha no válida:", date);
        return "";
    }

    if (onlyDay) {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      };

      return new Intl.DateTimeFormat('es-CL', options).format(date);
    } else {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Santiago',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

      return new Intl.DateTimeFormat('es-CL', options).format(date);
    }
}

  public static validateRUN = function(rut: any) {
    rut = rut.replace(/\./g, '').replace('-', '').trim();
    
    if (rut.length < 8) return false;
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }
    
    let dvEsperado: string | number = 11 - (suma % 11);
    
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();

    return dv === dvEsperado;
  }

  public static onlyNumbers(p1: HTMLInputElement): void {
    p1.value = p1.value.replace(/\D/g, '');
  }

  public static cleanRUN = function(p1: any) {
    return p1.replace(/[.-]/g, '');
  }

  public static isBlank(p1) {
    return /^ *$/.test(p1);
  }

  public static validatePhoneNumber(p1: HTMLInputElement): void {
    let value = p1.value;

    if (value.startsWith('+')) {
      value = '+' + value.slice(1).replace(/[^0-9]/g, '');
    } else {
      value = value.replace(/[^0-9]/g, '');
    }

    p1.value = value;
  }

  public static formatNameIdentifier(p1: HTMLInputElement): void {
    let value = p1.value;

    p1.value = value.replace(/[^a-zA-Z0-9-_]/g, '');
  }

  public static getUniqueId(p1: number): string {
    const stringArr = [];

    for(let i = 0; i< p1; i++){
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }

    return stringArr.join('-');
  }
  
  public static haveRole(p1: User, p2: any[]) {
    const role = p1.id_role.name;

    if(p2.includes(role)) {
      return true;
    }

    return false;
  }

  public static parseURL(p1) {
    if (p1 === "/") return ["/"];
    
    return p1.split('/').filter(Boolean).map(segment => '/' + segment);
  }
}
