export const urlAPI = 'http://localhost:7000';

export function changeColor(){
    const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    const randomIndex = Math.floor(Math.random() * (colors.length - 1));
    const result = colors[randomIndex];
    return result
}