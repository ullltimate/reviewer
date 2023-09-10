export const urlAPI: string = 'https://reviewer-server-dkmy.onrender.com';

export function changeColor(): string{
    const colors: string[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    const randomIndex: number = Math.floor(Math.random() * (colors.length - 1));
    const result: string = colors[randomIndex];
    return result
}

export function checkInputs(valueInputs: string[]){
    return valueInputs.every((el) => el.length>0);
}

export function resetInputs(valueInputs: any[]){
    valueInputs.forEach((el: any) => el(''));
}