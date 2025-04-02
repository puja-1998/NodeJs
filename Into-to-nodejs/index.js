const fs = require('fs'); // Import the file system module
const path = require('path'); // Import the path module
const readline = require('readline'); // Import the readline module for user input

// Define the path for the tasks file
const FILE_PATH = path.join(__dirname, 'tasks.txt');

// Create an interface for reading user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to load tasks from the file
function loadTasks() {
    if (!fs.existsSync(FILE_PATH)) return []; // Check if the file exists, return an empty array if not
    const data = fs.readFileSync(FILE_PATH, 'utf8'); // Read file contents
    return data.split('\n').filter(line => line).map(line => {
        const [desc, completed] = line.split('|'); // Split task description and completion status
        return { description: desc, completed: completed === 'true' }; // Convert completion status to boolean
    });
}

// Function to save tasks to the file
function saveTasks(tasks) {
    const data = tasks.map(task => `${task.description}|${task.completed}`).join('\n'); // Format tasks as text
    fs.writeFileSync(FILE_PATH, data); // Write tasks to file
}

// Function to add a new task
function addTask() {
    rl.question('Enter task description: ', (desc) => { // Prompt user for task description
        const tasks = loadTasks(); // Load existing tasks
        tasks.push({ description: desc, completed: false }); // Add new task to the list
        saveTasks(tasks); // Save updated task list
        console.log('Task added successfully!');
        rl.close(); // Close readline interface
    });
}

// Function to view all tasks
function viewTasks() {
    const tasks = loadTasks(); // Load existing tasks
    if (tasks.length === 0) { // Check if there are tasks
        console.log('No tasks found.');
    } else {
        tasks.forEach((task, index) => { // Loop through tasks and display them
            console.log(`${index + 1}. ${task.completed ? '[✔]' : '[ ]'} ${task.description}`);
        });
    }
}

// Function to mark a task as complete
function markTaskComplete() {
    const tasks = loadTasks(); // Load existing tasks
    viewTasks(); // Display tasks
    rl.question('Enter task number to mark complete: ', (num) => { // Prompt user for task number
        const index = parseInt(num) - 1; // Convert input to index
        if (tasks[index]) { // Check if task exists
            tasks[index].completed = true; // Mark task as complete
            saveTasks(tasks); // Save updated tasks
            console.log('Task marked as complete!');
        } else {
            console.log('Invalid task number.');
        }
        rl.close(); // Close readline interface
    });
}

// Function to remove a task
function removeTask() {
    const tasks = loadTasks(); // Load existing tasks
    viewTasks(); // Display tasks
    rl.question('Enter task number to remove: ', (num) => { // Prompt user for task number
        const index = parseInt(num) - 1; // Convert input to index
        if (tasks[index]) { // Check if task exists
            tasks.splice(index, 1); // Remove the task
            saveTasks(tasks); // Save updated tasks
            console.log('Task removed successfully!');
        } else {
            console.log('Invalid task number.');
        }
        rl.close(); // Close readline interface
    });
}

// Display menu options
console.log('1. Add Task');
console.log('2. View Tasks');
console.log('3. Mark Task as Complete');
console.log('4. Remove Task');

// Prompt user to choose an option
rl.question('Choose an option: ', (choice) => {
    switch (choice) {
        case '1': addTask(); break; // Add task
        case '2': viewTasks(); rl.close(); break; // View tasks and close
        case '3': markTaskComplete(); break; // Mark task as complete
        case '4': removeTask(); break; // Remove task
        default: console.log('Invalid choice.'); rl.close(); // Handle invalid input
    }
});
