{
    class ToDoList implements IToDoListExtension {
        constructor(public toDoList: ToDo [] = []) {
        }

        add(toDo: ToDo): void {
            if (this.toDoList.some(existedToDo => existedToDo.id === toDo.id || existedToDo.title === toDo.title)) {
                throw new Error("toDo already exists")
            }

            this.toDoList.push(toDo);
        }

        remove(id: number): void {
            this.toDoList = this.toDoList.filter(toDo => toDo.id !== id);
        }

        showToDoInfo(id: number): void {
            const toDo = this.toDoList.find(toDo => toDo.id === id);
            toDo === undefined ? console.log("ToDo can not e found") : console.log(toDo);
        }

        showToDoList(): void {
            console.log(this.toDoList);
        }

        showAmountInfo(): void {
            const inProgressAmount = this.toDoList.filter(toDo => !toDo.isDone).length
            console.log(`You have ${this.toDoList.length} items, ${inProgressAmount} still haven't been done`);
        }

        sortToDoByStatus(): void {
            this.toDoList = this.toDoList.sort((a, b) => {
                if (a.isDone === b.isDone) {
                    return 0;
                }
                return a.isDone ? -1 : 1;
            });
        }

        sortToDoByCreatedDate(): void {
            this.toDoList = this.toDoList.sort((a, b) => a.date.getTime() - b.date.getTime());
        }

        findToDoByDescription(description: string): ToDo | void {
            const targetToDo = this.toDoList.find(toDo => toDo.description.includes(description));
            return targetToDo ? targetToDo : console.log(`There is no item with searched description: ${description}`);
        }

        findToDoByName(name: string): ToDo | void {
            const targetToDo = this.toDoList.find(toDo => toDo.title.toLowerCase() === name.toLowerCase());
            return targetToDo ? targetToDo : console.log(`There is no item with searched name: ${name}`);
        }
    }

    class ToDo {
        readonly date: Date;
        public editDate: Date | null;

        constructor(
            public id: number,
            public title: string,
            private _description: string,
            public isDone: boolean,
            public isNeededToConfirmEdit: boolean = false,
        ) {
            this.date = new Date();
            this.editDate = null;
        }

        set description(value: string) {
            value ? this._description = value : console.log("Description mustn't be empty");
        }

        get description(): string {
            return this._description;
        }

        markAsDoneToggle(): void {
            this.isDone ? this.isDone = false : this.isDone = true;
        }

        edit(newDescription: string): void {
            if (this.isNeededToConfirmEdit) console.log("Please confirm edition") //some logic as example

            setTimeout(() => {
                this.editDate = new Date();
            }, 1000)

            this.description = newDescription;
        }
    }

    interface IToDoListExtension {
        sortToDoByStatus(): void;

        findToDoByName(name: string): ToDo | void;

        findToDoByDescription(description: string): ToDo | void;

        sortToDoByCreatedDate(): void;
    }

    const toDo1 = new ToDo(1, "eat", "eat vegetables", false, false);
    const toDo2 = new ToDo(2, "drink", "drink beer", false, true);

    const toDoList = new ToDoList();
    toDoList.add(toDo1);
    toDoList.add(toDo2);

    toDoList.showToDoList();

    // toDoList.add(toDo1); //error adding duplicate

    toDoList.remove(2);
    toDoList.showToDoList();
    toDoList.add(toDo2);

    toDo2.markAsDoneToggle();
    toDoList.showToDoInfo(1);
    toDoList.showAmountInfo();

    toDo1.edit("New Description");
    toDoList.showToDoList();

    toDoList.sortToDoByStatus();
    toDoList.showToDoList();
    toDoList.sortToDoByCreatedDate();
    toDoList.showToDoList();

    const targetToDo1 = toDoList.findToDoByDescription("New");
    console.log(targetToDo1);

    const targetToDo2 = toDoList.findToDoByName("Drink");
    console.log(targetToDo2);
}