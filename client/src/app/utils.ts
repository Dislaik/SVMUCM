export class Utils {

  public static formatRUN(p1: HTMLInputElement): void {
    p1.value = p1.value.replace(/[^0-9kK]/g, ''); // Remueve todo lo que no sea número o 'k'/'K'

    if (p1.value.length > 9) {
      p1.value = p1.value.slice(0, 9);
    }


    const valor: string = p1.value.replace(/^0+|[^0-9kK]+/g, '');
    p1.value = valor;

    // Aislar Cuerpo del número y Dígito Verificador
    const number: string = valor.slice(0, -1);
    const dv: string = valor.slice(-1);

    // Si el valor del número está vacío, deja el valor tal cual
    if (number === '') {
        p1.value = valor;
    } else {
        // Convertir número a string con separadores de miles y cambiar comas por puntos
        const formattedNumber: string = parseInt(number).toLocaleString('en').replace(/,/g, '.');
        p1.value = `${formattedNumber}-${dv}`;
    }
  }

  public static setStorage(p1: string, p2: string): void {
    window.localStorage.removeItem(p1);
    window.localStorage.setItem(p1, p2);
  }

  public static getStorage(p1: string): string | null {
    return window.localStorage.getItem(p1);
  }
}
