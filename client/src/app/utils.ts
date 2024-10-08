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
}
