export const examplePrograms = [
  {
    title: "Hello World",
    description: "A simple greeting program",
    code: '// This is a simple hello world program\nprint karo "Namaste Duniya!"\n',
  },
  {
    title: "Variables and Strings",
    description: "Creating variables and string concatenation",
    code: '// Creating variables and concatenating strings\nvariable banana naam = "Rahul"\nprint karo "Hello " + naam\n',
  },
  {
    title: "Simple Math",
    description: "Basic arithmetic operations",
    code: '// Basic arithmetic operations\nvariable banana x = 10\nvariable banana y = 5\nprint karo "Sum: " + (x + y)\nprint karo "Difference: " + (x - y)\nprint karo "Product: " + (x * y)\nprint karo "Division: " + (x / y)\n',
  },
  {
    title: "Multiple Variables",
    description: "Working with multiple variables",
    code: '// Working with multiple variables\nvariable banana umar = 25\nvariable banana naam = "Priya"\nvariable banana city = "Mumbai"\nprint karo naam + " ki umar " + umar + " hai aur woh " + city + " mein rehti hai"\n',
  },
  {
    title: "Update Variables",
    description: "Demonstrates assignment and updating values",
    code: '// Updating existing variable values\nvariable banana score = 50\nprint karo "Initial Score: " + score\nscore = score + 25\nprint karo "Updated Score: " + score\n',
  },
  {
    title: "String and Number Mixing",
    description: "Demonstrates automatic type conversion during concatenation",
    code: '// Mixing strings and numbers in output\nvariable banana naam = "Aman"\nvariable banana age = 22\nprint karo naam + " is " + age + " years old"\n',
  },
  {
    title: "Chained Calculations",
    description: "Performing calculations in sequence",
    code: '// Chained math calculations\nvariable banana base = 5\nvariable banana height = 10\nvariable banana area = (base * height) / 2\nprint karo "Area of triangle: " + area\n',
  },
  {
    title: "Use Variable in Expression",
    description: "Use previously declared variables in new calculations",
    code: '// Reusing variables in expressions\nvariable banana length = 8\nvariable banana width = 3\nvariable banana perimeter = 2 * (length + width)\nprint karo "Perimeter: " + perimeter\n',
  },
  {
    title: "Redefining Variable with String",
    description: "Changes variable from number to string",
    code: '// Redefining variable with different type\nvariable banana value = 100\nprint karo "Value is: " + value\nvalue = "hundred"\nprint karo "Now value is: " + value\n',
  },
  {
    title: "Print Only Numbers",
    description: "A clean numeric calculation without strings",
    code: "// Print raw number results\nvariable banana a = 7\nvariable banana b = 3\nprint karo a + b\nprint karo a * b\n",
  },
];
