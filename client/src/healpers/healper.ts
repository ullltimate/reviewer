export const urlAPI: string = 'http://localhost:7000';

export function changeColor(): string{
    const colors: string[] = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    const randomIndex: number = Math.floor(Math.random() * (colors.length - 1));
    const result: string = colors[randomIndex];
    return result
}