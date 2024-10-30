import { jwtDecode } from "jwt-decode";

export class Utils {

  public static formatRUN(p1: HTMLInputElement): void {
    // Remueve todo lo que no sea número o 'k'/'K'
    p1.value = p1.value.replace(/[^0-9kK]/g, '');

    // Limita el valor a un máximo de 9 caracteres
    if (p1.value.length > 9) {
        p1.value = p1.value.slice(0, 9);
    }

    const valor: string = p1.value.replace(/^0+|[^0-9kK]+/g, '');
    p1.value = valor;

    // Aislar el cuerpo del número y dígito verificador
    const number: string = valor.slice(0, -1);
    const dv: string = valor.slice(-1);

    // Si el cuerpo del número está vacío, no formatear
    if (number === '') {
        p1.value = valor;
    } else {
        // Convertir número a string solo si es válido, para evitar NaN
        const formattedNumber: string = isNaN(parseInt(number)) ? number : parseInt(number).toLocaleString('en').replace(/,/g, '.');
        p1.value = `${formattedNumber}-${dv}`;
    }
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
    const decoded = jwtDecode(token);

    return decoded['username']
  }

  public static convertToChileTime(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Santiago',  // Zona horaria de Chile
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false  // Para formato de 24 horas
    };

    return new Intl.DateTimeFormat('es-CL', options).format(date);
  }

  public static validateRUN = function(rut: any) {
    // Limpiar el RUT, eliminando puntos, guiones y espacios
    rut = rut.replace(/\./g, '').replace('-', '').trim();
    
    // Verificar que el RUT tenga al menos 8 caracteres
    if (rut.length < 8) return false;

    // Extraer el dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    
    // Calcular el dígito verificador
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
    
    // Comparar el dígito verificador calculado con el ingresado
    return dv === dvEsperado;
  }

  public static cleanRUN = function(p1: any) {
    return p1.replace(/[.-]/g, '');
  }
}
