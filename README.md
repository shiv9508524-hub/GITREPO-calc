# 🧮 Interactive Web Calculator

A responsive, feature-rich web calculator application built using vanilla **HTML5**, **CSS3 (CSS Grid & Flexbox)**, and **JavaScript (ES6+)**.

---

## 🚀 Key Features

- **Standard Arithmetic Operations**: Addition (`+`), Subtraction (`−`), Multiplication (`×`), and Division (`÷`).
- **Additional Functionalities**: 
  - All Clear (`AC`) and Backspace / Delete (`DEL`).
  - Percentage calculation (`%`).
  - Decimal precision support (`.`).
  - Safe error handling (e.g., divide by zero detection).
- **Dual Display Screen**:
  - Upper row displays the running expression and selected operator.
  - Lower row displays the live input number or computed result.
  - Dynamic font-size scaling for large numerical outputs.
- **CSS Grid System**:
  - CSS Grid (`display: grid; grid-template-columns: repeat(4, 1fr);`) aligns the keypad with precision.
  - Span feature (`grid-column: span 2;`) for the `0` key.
- **Dark / Light Theme Toggle**: Seamless switching between sleek dark glassmorphism and crisp light mode.
- **Keyboard & Numpad Support**:
  - Numbers `0-9`
  - Operators `+`, `-`, `*`, `/`, `%`
  - `Enter` or `=` for calculation
  - `Backspace` for DEL
  - `Escape` for All Clear (AC)

---

## 🛠️ Concepts & Technologies Used

### 1. HTML5
- Semantic container layout (`.calculator-container`, `.display-screen`, `.keypad-grid`).
- Custom `data-*` attributes (`data-number`, `data-operator`, `data-action`) for clean JavaScript decoupling.

### 2. CSS3 & CSS Grid
- **CSS Grid Keypad**:
  ```css
  .keypad-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(5, 60px);
    gap: 12px;
  }
  ```
- **CSS Custom Properties (Variables)** for fluid theme switching.
- **Micro-interactions**: Active states, button compression animations, and glassmorphism shadows.

### 3. JavaScript (ES6+)
- **Loops**: Iterates through all button nodes (`allButtons.forEach(...)`) to bind unified click listeners.
- **Event Listeners**:
  - `click` events for interactive button inputs.
  - `keydown` event on `window` for desktop/numpad accessibility.
- **Conditional Logic (if / else if / else)**:
  - Validates single decimal inputs.
  - Checks for division by zero (`if (current === 0) { ... }`).
  - Routes button actions (`clear`, `delete`, `calculate`, etc.).
- **Operators**:
  - Arithmetic: `+`, `-`, `*`, `/`, `%`
  - Comparison: `===`, `!==`, `>`, `<`
  - Logical: `&&`, `||`, `!`

---

## 📂 Project Structure

```text
calculator/
│── index.html    # Main HTML structure and display screen
│── style.css     # CSS Grid styling, animations, and dark/light themes
│── script.js     # Calculator logic, event listeners, loops, conditions
└── README.md     # Project documentation
```

---

## 💻 How to Run

1. Open the project folder:
   `C:\Users\Shivendra Sharma\.gemini\antigravity\scratch\calculator`
2. Double-click [index.html](file:///C:/Users/Shivendra%20Sharma/.gemini/antigravity/scratch/calculator/index.html) to open it directly in any web browser (Chrome, Edge, Firefox, Safari).
3. Or serve it with any live server (e.g. VS Code Live Server / Python `http.server`).
