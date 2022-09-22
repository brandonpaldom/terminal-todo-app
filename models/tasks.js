const Task = require('./task');

class Tasks {
  _list = {};

  get listArr() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id = '') {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  loadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = '') {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listTasks() {
    console.log();
    this.listArr.forEach((task, i) => {
      const idx = `${i + 1}`.green;
      const { description, completed } = task;
      const status = completed ? 'Completed'.green : 'Pending'.red;

      console.log(`${idx} ${description} :: ${status}`);
    });
  }

  listCompletedOrPending(completed = true) {
    console.log();
    let counter = 0;
    this.listArr.forEach((task) => {
      const { description, completed: status } = task;
      const statusTask = status ? 'Completed'.green : 'Pending'.red;

      if (completed) {
        if (status) {
          counter += 1;
          console.log(
            `${(counter + '.').green} ${description} :: ${statusTask}`
          );
        }
      } else if (!status) {
        counter += 1;
        console.log(`${(counter + '.').green} ${description} :: ${statusTask}`);
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completed) {
        task.completed = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completed = null;
      }
    });
  }
}

module.exports = Tasks;
