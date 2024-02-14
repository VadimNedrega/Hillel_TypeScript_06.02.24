// Ви маєте JS код, який необхідно розширити анотацією примітивів,
// масивів, об'єктів (за необхідності),
// подумати над використанням перерахувань,
// а також реалізувати описані у вигляді коментарів властивості та методи.
// Крім цього є завдання з *, яке не є обов'язковим, але може вас зацікавити.

class School {
    // implement 'add area', 'remove area', 'add lecturer', and 'remove lecturer' methods

    _areas: Array<Area> = [];
    _lecturers: Array<Lecturer> = []; // Name, surname, position, company, experience, courses, contacts

    get areas() {
        return this._areas;
    }

    get lecturers() {
        return this._lecturers;
    }

    addArea(area: Area){
        this._areas = [...(this.areas), area];
    }

    removeArea(area: Area){
        this._areas = this._areas.filter(el => el._name !== area._name);
    }

    addLecturer(lecturer: Lecturer){
        this._lecturers = [...(this.lecturers), lecturer];
    }

    removeLecturer(lecturer: Lecturer){
        this._lecturers = this._lecturers.filter(el => el.surname !== lecturer.surname ??  el.name !== lecturer.name);
    }
}

enum Course {
    JAVASCRIPT = "Javascript",
    TYPESCRIPT = "Typescript",
    JAVA = "Java",
    JAVA_PRO = "Java_PRO",
    COOKING = "Cooking"
}

enum Position{
    SENIOR,
    MIDDLE,
    JUNIOR
}

class Lecturer {
    name: string;
    surname: string;
    position: Position;
    company: string;
    experience: number;
    courses: Array<Course>;
    contacts: Array<object>;

    constructor(name: string, surname: string, position: Position, company: string, experience: number, courses: Array<Course>, contacts: Array<object>) {
        this.name = name;
        this.surname = surname;
        this.position = position;
        this.company = company;
        this.experience = experience;
        this.courses = courses;
        this.contacts = contacts;
    }
}

class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: Array<Level> = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string | undefined {
        return this._name;
    }

    get levels(): Array<Level> {
        return this._levels;
    }

    addLevel(level: Level){
        this._levels = [...(this.levels), level];
    }

    removeLevel(level: Level){
        this._levels = this._levels.filter(el => el._name !== level._name)
    }
}

class Level {
    // implement getters for fields and 'add/remove group' methods

    _groups: Array<Group> = [];
    _description: string;
    _name: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    get groups(): Array<Group> {
        return this._groups;
    }

    get description(){
        return this._description;
    }

    get name(){
        return this._name;
    }

    addGroup(group: Group){
        this._groups = [...(this.groups), group];
    }

    removeGroup(group: Group){
        this._groups = this._groups.filter(el => el._id !== group._id);
    }
}

interface Array<T> {
    toSorted(compareFn: (a: T, b: T) => number): Array<T>;
}

Array.prototype.toSorted = function<T>(compareFn: (a: T, b: T) => number): Array<T> {
    return this.slice().sort(compareFn);
};

class Group {
    // implement getters for fields and 'add/remove student' and 'set status' methods
    _id: number;
    _directionName: string;
    _levelName: string;
    _students: Array<Student> = []; // Modify the array so that it has a valid toSorted method*
    private _area: Area | undefined;
    private _status: Status | undefined;

    constructor(id: number, directionName: string, levelName: string) {
        this._id = id;
        this._directionName = directionName;
        this._levelName = levelName;
    }

    get id(): number {
        return this._id;
    }

    get area(): Area | undefined {
        return this._area;
    }

    get directionName(): string {
        return this._directionName;
    }

    get levelName(): string {
        return this._levelName;
    }

    get students(): Array<Student> {
        return this._students;
    }

    get status(): Status {
        return <Status>this._status;
    }

    set status(value: Status) {
        this._status = value;
    }

    set area(value: Area) {
        this._area = value;
    }

    addStudent(stud: Student){
        this._students = [...this.students, stud];
    }

    removeStudent(stud: Student){
        this._students = this._students.filter(el => el.fullName !== stud.fullName);
    }

    showPerformance() {
        return this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
    }
}

enum Status {
    IN_PROCESSING= "InProcessing",
    NOT_STARTED = "NotStarted",
    FINISHED = "Finished"
}

class Student {
    // implement 'set grade' and 'set visit' methods

    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: Array<number> = []; // workName: mark
    _visits: Array<boolean> = []; // lesson: present

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age() {
        return new Date().getFullYear() - this._birthYear;
    }

    get grades(): Array<number> {
        return this._grades;
    }

    get visits(): Array<boolean> {
        return this._visits;
    }

    set grade(mark: number){
        this._grades = [...this.grades, mark]
    }

    set present(isPresent: boolean){
        this._visits = [...this.visits, isPresent]
    }

    getPerformanceRating() {
        const gradeValues = Object.values(this._grades);

        if (!gradeValues.length) return 0;

        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;

        return (averageGrade + attendancePercentage) / 2;
    }
}

//School
const school = new School();

//Lecturers
const lecturer1 = new Lecturer("Name1", "Surname1", Position.SENIOR, "Google", 5, [Course.JAVA_PRO, Course.JAVASCRIPT], [{name: "Vasia"}, {name: "Julia"}])
const lecturer2 = new Lecturer("Name2", "Surname2", Position.JUNIOR, "Kontora Chudes", 1, [Course.COOKING, Course.TYPESCRIPT], [{name: "Vasia"}, {name: "Julia"}])

//Students
const student1 = new Student("Student1", "SomeLastName", 2002);
student1.grade = 10;
student1.grade = 12;
student1.present = true;
student1.present = true;
console.log(student1)

const student2 = new Student("Student2", "SomeLastName2", 2005);
student2.grade = 3;
student2.grade = 4;
student2.present = false;
student2.present = false;
console.log(student2)

//Area
const area1 = new Area("IT")
const area2 = new Area("COOKING")
console.log(area1)
console.log(area2)

//Group
const group1 = new Group(1, "Group1", "level1._name")
group1.addStudent(student1)
group1.addStudent(student2)
group1.removeStudent(student2)
group1.status = Status.IN_PROCESSING;
group1.area = area1;
const group2 = new Group(2, "Group2", "level2._name")
group2.addStudent(student1)
group2.addStudent(student2)
group2.status = Status.FINISHED;
group2.area = area2;
console.log(group1)
console.log(group2)

//Levels
const level1 = new Level("Level1", "Desc1");
level1.addGroup(group1);
level1.addGroup(group2);
level1.removeGroup(group2);
const level2 = new Level("Level2", "Desc2");
level2.addGroup(group1);
console.log(level1);
console.log(level2);

//add level to Area
area1.addLevel(level1);
area1.addLevel(level2)
area1.removeLevel(level2);
console.log(area1);
console.log(area2);

//add lecturers & Areas to School
school.addLecturer(lecturer1)
console.log(school)
school.addLecturer(lecturer2)
school.removeLecturer(lecturer1);
school.addArea(area1);
school.addArea(area2);
school.removeArea(area2);
console.log(school)

//Student & Group getPerformanceRating
console.log(student1.getPerformanceRating());
console.log(student2.getPerformanceRating());
console.log(group2.showPerformance())