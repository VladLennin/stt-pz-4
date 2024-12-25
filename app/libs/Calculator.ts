import { evaluate } from 'mathjs'

export class Calculator {

  actions: Array<string> = ['+', '-', '*', '/', '.', '%'];
  dashboard: HTMLInputElement;

  //constructor
  constructor() {
    this.dashboard = document.getElementById("dashboard") as HTMLInputElement;
    this.setTheme('theme-one');
  }

  printAction(val: string): void {
    if (val === '+/-') {
      let firstDigit = this.dashboard.value[0]
      if (firstDigit === '-') {
        this.dashboard.value = this.dashboard.value.slice(1, this.dashboard.value.length)
      } else {
        this.dashboard.value = '-' + this.dashboard.value
      }
    } else if (this.actions.includes(this.dashboard.value[this.dashboard.value.length - 1])
      || this.dashboard.value.length === 0) {
    } else {
      this.dashboard.value += val
    }
  }

  printDigit(val: string) {
    this.dashboard.value += val
  }

  solve(): void {
    let expression = this.dashboard.value;

    if (expression === "" || /[+\-*/.%]{2,}/.test(expression)) {
      this.dashboard.value = 'invalid';
      return;
    }

    try {
      this.dashboard.value = evaluate(expression);
    } catch (error) {
      this.dashboard.value = 'invalid';
    }
  }

  clr() {
    this.dashboard.value = ''
  }

  setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.querySelector('body').className = themeName;
  }

  toggleTheme() {
    let theme = localStorage.getItem('theme');

    if (theme === 'theme-second') {
      theme = 'theme-one'
    } else if (theme === 'theme-one') {
      theme = 'theme-second'
    }
    this.setTheme(theme);
  }

  save() {
    localStorage.setItem('result', this.dashboard.value);
  }

  paste() {
    this.printDigit(localStorage.getItem('result'))
  }

}




