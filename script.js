/**
 * ==============================================================================
 * INTERACTIVE CALCULATOR ENGINE
 * Demonstrates:
 * 1. DOM Selection & Manipulation
 * 2. Loops (iterating over button collections to bind listeners)
 * 3. Event Listeners (Mouse clicks + Keyboard/Numpad support)
 * 4. Conditional (if / else if / else) Logic & Switch Statements
 * 5. Arithmetic, Comparison, and Logical Operators
 * ==============================================================================
 */

// -----------------------------------------------------------------------------
// 1. STATE VARIABLES & DOM ELEMENTS
// -----------------------------------------------------------------------------
let previousOperand = '';
let currentOperand = '0';
let operation = undefined;
let shouldResetScreen = false;

// DOM Element references
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const allButtons = document.querySelectorAll('.btn');
const themeToggleBtn = document.getElementById('themeToggle');

// -----------------------------------------------------------------------------
// 2. CORE CALCULATOR FUNCTIONS
// -----------------------------------------------------------------------------

/**
 * Resets the entire calculator state to default (All Clear).
 */
function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  shouldResetScreen = false;
  updateDisplay();
}

/**
 * Deletes the last character from current input (Backspace / DEL).
 */
function deleteLastDigit() {
  if (shouldResetScreen) return;
  if (currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
    clearAll();
    return;
  }

  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

/**
 * Appends a digit (0-9) to the current operand.
 * @param {string} number - The digit character to append.
 */
function appendNumber(number) {
  // If the user just completed a calculation, typing a new number starts fresh
  if (shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }

  // Prevent leading zeros like '0005'
  if (currentOperand === '0') {
    currentOperand = number;
  } else {
    // Limit length to avoid screen overflow
    if (currentOperand.length < 14) {
      currentOperand += number;
    }
  }
  updateDisplay();
}

/**
 * Appends a decimal point, ensuring only one decimal point exists.
 */
function appendDecimal() {
  if (shouldResetScreen) {
    currentOperand = '0';
    shouldResetScreen = false;
  }

  // If already contains a decimal, do nothing (if-else condition)
  if (!currentOperand.includes('.')) {
    currentOperand += '.';
  }
  updateDisplay();
}

/**
 * Applies percentage operation on current operand.
 */
function applyPercentage() {
  const current = parseFloat(currentOperand);
  if (isNaN(current)) return;

  // Percentage operator: value / 100
  currentOperand = (current / 100).toString();
  updateDisplay();
}

/**
 * Selects an arithmetic operator (+, -, *, /) and chains calculations if needed.
 * @param {string} op - The operator symbol ('+', '-', '*', '/').
 */
function chooseOperation(op) {
  if (currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
    clearAll();
    return;
  }

  // If an operation was already selected and current input is present, calculate intermediate result
  if (previousOperand !== '') {
    compute();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = '0';
  shouldResetScreen = false;
  updateDisplay();
}

/**
 * Performs calculation using arithmetic operators (+, -, *, /) and if-else logic.
 */
function compute() {
  let computationResult;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // If either number is invalid, abort computation
  if (isNaN(prev) || isNaN(current)) return;

  // Evaluate calculation based on operator using if-else / switch conditions
  if (operation === '+') {
    computationResult = prev + current;
  } else if (operation === '-') {
    computationResult = prev - current;
  } else if (operation === '*') {
    computationResult = prev * current;
  } else if (operation === '/') {
    // Handle division by zero edge case
    if (current === 0) {
      currentOperand = 'Cannot divide by 0';
      previousOperand = '';
      operation = undefined;
      shouldResetScreen = true;
      updateDisplay();
      return;
    } else {
      computationResult = prev / current;
    }
  } else {
    return;
  }

  // Round floating point precision issues (e.g. 0.1 + 0.2 = 0.30000000000000004)
  computationResult = Math.round(computationResult * 1e10) / 1e10;

  currentOperand = computationResult.toString();
  operation = undefined;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

/**
 * Converts internal operator symbol to human-friendly display symbol.
 * @param {string} op 
 * @returns {string} Display symbol
 */
function getDisplayOperator(op) {
  if (op === '+') return '+';
  if (op === '-') return '−';
  if (op === '*') return '×';
  if (op === '/') return '÷';
  return '';
}

/**
 * Formats a number string with commas for thousands.
 * @param {string} number 
 * @returns {string} Formatted number
 */
function formatDisplayNumber(number) {
  if (number === 'Cannot divide by 0' || number === 'Error') {
    return number;
  }

  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  let integerDisplay;

  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    });
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

/**
 * Updates the calculator screen display with current state.
 */
function updateDisplay() {
  currentOperandElement.innerText = formatDisplayNumber(currentOperand);

  // Auto-adjust font size for large outputs
  if (currentOperand.length > 10) {
    currentOperandElement.style.fontSize = '1.5rem';
  } else if (currentOperand.length > 7) {
    currentOperandElement.style.fontSize = '1.85rem';
  } else {
    currentOperandElement.style.fontSize = '2.25rem';
  }

  if (operation != null && previousOperand !== '') {
    previousOperandElement.innerText = `${formatDisplayNumber(previousOperand)} ${getDisplayOperator(operation)}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

// -----------------------------------------------------------------------------
// 3. EVENT LISTENERS USING LOOPS
// -----------------------------------------------------------------------------

/**
 * Using a for loop / forEach loop over button elements to bind event listeners
 */
allButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const number = button.getAttribute('data-number');
    const operator = button.getAttribute('data-operator');
    const action = button.getAttribute('data-action');

    // Visual active feedback
    button.classList.add('pressed');
    setTimeout(() => button.classList.remove('pressed'), 120);

    // Conditional branches to handle user action
    if (number !== null) {
      appendNumber(number);
    } else if (operator !== null) {
      chooseOperation(operator);
    } else if (action !== null) {
      if (action === 'clear') {
        clearAll();
      } else if (action === 'delete') {
        deleteLastDigit();
      } else if (action === 'decimal') {
        appendDecimal();
      } else if (action === 'percent') {
        applyPercentage();
      } else if (action === 'calculate') {
        compute();
      }
    }
  });
});

// -----------------------------------------------------------------------------
// 4. KEYBOARD SUPPORT (Event Listener for keydown)
// -----------------------------------------------------------------------------
window.addEventListener('keydown', function (e) {
  const key = e.key;

  // Digits 0 - 9
  if (key >= '0' && key <= '9') {
    appendNumber(key);
    highlightButton(`[data-number="${key}"]`);
  }
  // Decimal Point
  else if (key === '.') {
    appendDecimal();
    highlightButton('[data-action="decimal"]');
  }
  // Operators (+, -, *, /)
  else if (key === '+' || key === '-' || key === '*' || key === '/') {
    chooseOperation(key);
    highlightButton(`[data-operator="${key}"]`);
  }
  // Equals & Enter
  else if (key === '=' || key === 'Enter') {
    e.preventDefault();
    compute();
    highlightButton('[data-action="calculate"]');
  }
  // Backspace (DEL)
  else if (key === 'Backspace') {
    deleteLastDigit();
    highlightButton('[data-action="delete"]');
  }
  // Escape (AC)
  else if (key === 'Escape') {
    clearAll();
    highlightButton('[data-action="clear"]');
  }
  // Percentage (%)
  else if (key === '%') {
    applyPercentage();
    highlightButton('[data-action="percent"]');
  }
});

/**
 * Helper to visually highlight a button pressed via keyboard.
 */
function highlightButton(selector) {
  const btn = document.querySelector(selector);
  if (btn) {
    btn.classList.add('pressed');
    setTimeout(() => btn.classList.remove('pressed'), 150);
  }
}

// -----------------------------------------------------------------------------
// 5. THEME TOGGLE (Dark / Light Mode)
// -----------------------------------------------------------------------------
themeToggleBtn.addEventListener('click', function () {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  const themeIcon = themeToggleBtn.querySelector('.theme-icon');
  
  if (isLight) {
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
});
