// import {Calculator} from './Calculator';
//
// describe('Test suite for Calculator.ts', () => {
//   let calculator;
//   beforeAll(() => {
//     let inputResult = document.createElement("input");
//     inputResult.type = "text";
//     inputResult.id = 'dashboard'
//     inputResult.className = "app-result";
//
//     calculator = new Calculator()
//     calculator.dashboard = inputResult;
//   });
//
//   it('printDigit should to be defined', () => {
//     expect(calculator.printDigit).toBeDefined();
//   });
//
//   it('printDigit should add new value', () => {
//     calculator.printDigit('5');
//     calculator.printDigit('5');
//     expect(calculator.dashboard.value).toBe('55');
//   });
//
//   it('printDigit should to be call in calculator.paste', () => {
//     const onSpy = jest.spyOn(calculator, 'printDigit');
//     calculator.paste()
//     expect(onSpy).toHaveBeenCalled();
//   });
//
//   it('printAction should to be defined', () => {
//     expect(calculator.printAction).toBeDefined();
//   });
//
// });
//
//


import { Calculator } from './Calculator';

describe('Test suite for Calculator.ts', () => {
  let calculator: Calculator;
  let inputResult: HTMLInputElement;

  beforeAll(() => {
    inputResult = document.createElement("input");
    inputResult.type = "text";
    inputResult.id = 'dashboard';
    inputResult.className = "app-result";
    calculator = new Calculator();
    calculator.dashboard = inputResult;
  });

  it('printDigit should be defined', () => {
    expect(calculator.printDigit).toBeDefined();
  });

  it('printDigit should add new value', () => {
    calculator.printDigit('5');
    calculator.printDigit('5');
    expect(calculator.dashboard.value).toBe('55');
  });

  it('printDigit should not add value if the dashboard is not a valid number', () => {
    calculator.dashboard.value = 'abc';
    calculator.printDigit('1');
    expect(calculator.dashboard.value).toBe('abc1');
  });

  it('printAction should be defined', () => {
    expect(calculator.printAction).toBeDefined();
  });

  it('printAction should add valid operator', () => {
    calculator.clr()
    calculator.printDigit('5');
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('5+');
  });

  it('printAction should not add an operator if the last character is already an operator', () => {
    calculator.dashboard.value = '5+';
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('5+');
  });

  it('printAction should not add an operator if the dashboard value is empty', () => {
    calculator.dashboard.value = '';
    calculator.printAction('+');
    expect(calculator.dashboard.value).toBe('');
  });

  it('printAction should add +/- operator correctly', () => {
    calculator.dashboard.value = '5';
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('-5');
    calculator.printAction('+/-');
    expect(calculator.dashboard.value).toBe('5');
  });

  it('solve should evaluate an expression', () => {
    calculator.dashboard.value = '2+2';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('4');
  });

  it('solve should handle invalid expression gracefully', () => {
    calculator.dashboard.value = 'invalid';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('invalid');
  });

  it('clr should clear the input', () => {
    calculator.dashboard.value = '123';
    calculator.clr();
    expect(calculator.dashboard.value).toBe('');
  });

  it('setTheme should set and apply the correct theme', () => {
    calculator.setTheme('theme-one');
    expect(localStorage.getItem('theme')).toBe('theme-one');
    expect(document.querySelector('body')?.className).toBe('theme-one');
  });

  it('toggleTheme should switch themes correctly', () => {
    localStorage.setItem('theme', 'theme-one');
    calculator.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('theme-second');
    expect(document.querySelector('body')?.className).toBe('theme-second');

    calculator.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('theme-one');
    expect(document.querySelector('body')?.className).toBe('theme-one');
  });

  it('save should store result in localStorage', () => {
    calculator.dashboard.value = '100';
    calculator.save();
    expect(localStorage.getItem('result')).toBe('100');
  });

  it('paste should paste the stored result', () => {
    localStorage.setItem('result', '50');
    const onSpy = jest.spyOn(calculator, 'printDigit');
    calculator.clr()
    calculator.paste();
    expect(onSpy).toHaveBeenCalledWith('50');
    expect(calculator.dashboard.value).toBe('50');
  });

  it('should handle empty dashboard when pasting', () => {
    localStorage.setItem('result', '50');
    calculator.dashboard.value = '';
    calculator.paste();
    expect(calculator.dashboard.value).toBe('50');
  });

  it('should set the correct initial state of the dashboard', () => {
    calculator.clr()
    expect(calculator.dashboard.value).toBe('');
  });

  it('should handle edge cases with empty and invalid input during calculation', () => {
    calculator.dashboard.value = '';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('invalid');

    calculator.dashboard.value = '5++5';
    calculator.solve();
    expect(calculator.dashboard.value).toBe('invalid');
  });
});
