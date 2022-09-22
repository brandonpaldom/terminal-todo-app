require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  listTasksDelete,
  confirm,
  showChecklist,
} = require('./helpers/inquirer');
const { saveFile, readFile } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDB = readFile();

  if (tasksDB) {
    tasks.loadTasksFromArray(tasksDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
        const desc = await readInput('Description:');
        tasks.createTask(desc);
        break;
      case '2':
        tasks.listTasks();
        break;
      case '3':
        tasks.listCompletedOrPending(true);
        break;
      case '4':
        tasks.listCompletedOrPending(false);
        break;
      case '5':
        const ids = await showChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case '6':
        const id = await listTasksDelete(tasks.listArr);
        if (id !== '0') {
          const ok = await confirm('Are you sure?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Task deleted');
          }
        }
        break;
    }

    saveFile(tasks.listArr);

    await pause();
  } while (opt !== '0');

  // pause();
};

main();
