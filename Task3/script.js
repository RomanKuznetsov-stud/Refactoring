
class Student {
    constructor(lastName, firstName, math, history, js) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.grades = { Math: math, History: history, JS: js };
        this.average = this.calculateAverage();
    }

    calculateAverage() {
        const grades = Object.values(this.grades);
        return (grades.reduce((sum, grade) => sum + grade, 0) / grades.length).toFixed(2);
    }
}

class ListOfStudents {
    constructor(students) {
        this.students = students;
    }

    getTableList() {
        let table = `
                <table>
                    <tr>
                        <th>LastName</th>
                        <th>Name</th>
                        <th>Math</th>
                        <th>History</th>
                        <th>JS</th>
                        <th>Avg</th>
                    </tr>`;
        this.students.forEach(student => {
            table += `
                    <tr>
                        <td>${student.lastName}</td>
                        <td>${student.firstName}</td>
                        <td>${student.grades.Math}</td>
                        <td>${student.grades.History}</td>
                        <td>${student.grades.JS}</td>
                        <td>${student.average}</td>
                    </tr>`;
        });
        table += `</table>`;
        return table;
    }
}

class StylesTable extends ListOfStudents {
    getStyles() {
        return `
                <style>
                    table { border-collapse: collapse; width: 80%; margin: 20px auto; }
                    th, td { border: 1px solid black; padding: 10px; text-align: center; }
                    th { background-color: green; color: white; }
                </style>`;
    }

    getTableList() {
        return this.getStyles() + super.getTableList();
    }

    getAvg() {
        this.students.forEach(student => {
            student.average = student.calculateAverage();
        });
    }

    getTotalAvg() {
        const totalAvg = (
            this.students.reduce((sum, student) => sum + parseFloat(student.average), 0) /
            this.students.length
        ).toFixed(2);
        return `Середній бал по групі = ${totalAvg}`;
    }
}

const students = [
    new Student("Марчук", "Марія", 6, 4, 7),
    new Student("Вовк", "Сергій", 4, 5, 2),
    new Student("Варалін", "Іван", 3, 2, 3),
];

const table = new StylesTable(students);
document.write(table.getTableList());
document.write(`<p>${table.getTotalAvg()}</p>`);
