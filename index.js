function Student() {
    let _details = [];
    Object.defineProperties(this, {
        Details: {
            get: function () {
                return _details;
            },
            set: function (value) {
                switch (value?.action) {
                    case "A":
                        delete value.action;
                        _details.push(value);
                        break;
                    default:
                        _details = value;
                }
            },
        },
    });
}

//View Faculty Data
function Faculty() {
    let _details = [
        {
            Id: "1",
            Name: "John",
            Department: "B.Sc [Computer Science]",
            Subject: "Physics",
        },
        {
            Id: "2",
            Name: "Adam",
            Department: "B.Com [CS]",
            Subject: "Commerce",
        },
    ];
    Object.defineProperties(this, {
        Details: {
            get: function () {
                return _details;
            },
            set: function (value) {
                switch (value?.action) {
                    case "A":
                        delete value.action;
                        _details.push(value);
                        break;
                    default:
                        _details = value;
                }
            },
        },
    });
}

//View Course data
function Courses() {
    let _details = [
        { Id: "1", Name: "Typing", Duration: "6 months" },
        { Id: "2", Name: "Programming", Duration: "10 months" },
    ];
    Object.defineProperties(this, {
        Details: {
            get: function () {
                return _details;
            },
            set: function (value) {
                try {
                    switch (value?.action) {
                        case "A":
                            delete value.action;
                            _details.push(value);
                            break;
                        default:
                            _details = value;
                    }
                } catch (e) {
                    alert("Something went wrong!");
                }
            },
        },
    });
}
const studentObj = new Student();
const facultyObj = new Faculty();
const courseObj = new Courses();

//Inserting Student data
function addStudentInfo(defaultPromptText = "") {
    let inputPrompt = prompt(
        "Please enter student details - Example: Id, Name, Grade, Fees Status (Y/N)",
        defaultPromptText
    );
    if (inputPrompt !== "") {
        let splittedValue = inputPrompt?.toUpperCase().split(",");
        if (!findStudentsById(splittedValue[0])) {
            studentObj.Details = {
                Id: splittedValue[0],
                Name: splittedValue[1],
                Grade: splittedValue[2],
                "Fees Status": splittedValue[3],
                action: "A",
            };
            alert("Inserted Successfully!");
        } else {
            alert("Entered is already taken, please enter a new Id!");
            addStudentInfo(inputPrompt);
        }
    } else {
        alert("Please enter valid details!");
        addStudentInfo();
    }
}

//Inserting Faculty data
function addFacultyInfo() {
    let inputPrompt = prompt(
        "Please enter faculty details - Example: Id, Name, Department, Subject"
    );
    if (inputPrompt !== "") {
        let splittedValue = inputPrompt?.toUpperCase().split(",");
        studentObj.Details = {
            Id: splittedValue[0],
            Name: splittedValue[1],
            Department: splittedValue[2],
            Subject: splittedValue[3],
            action: "A",
        };
        alert("Inserted Successfully!");
    } else {
        alert("Please enter valid details!");
        addFacultyInfo();
    }
}

//Search Student data
function findStudentsById(id) {
    if (studentObj.Details.length > 0) {
        let result = studentObj.Details.filter((student) => student.Id == id);
        return result.length > 0
            ? `${result[0].Id}, ${result[0].Name}, ${result[0].Grade}, ${result[0]["Fees Status"]}`
            : false;
    } else {
        return false;
    }
}

//Updating Student data
function updateStudentInfo() {
    let inputPrompt = prompt("Please enter a student Id to be updated");
    if (inputPrompt != null) {
        let matchedStudentDetails = findStudentsById(inputPrompt) || "";
        if (matchedStudentDetails) {
            let splittedVal = matchedStudentDetails.split(",");
            let studentId = splittedVal.shift();
            let updatedStudentData = prompt(
                "Please make your changes",
                splittedVal.join(",")
            );
            if (updatedStudentData) {
                let result = studentObj.Details?.map((student) => {
                    let temp = { ...student };
                    if (student.Id == inputPrompt) {
                        let splittedValue = updatedStudentData
                            .toUpperCase()
                            .split(",");
                        temp = {
                            Id: studentId,
                            Name: splittedValue[0],
                            Grade: splittedValue[1],
                            "Fees Status": splittedValue[2],
                        };
                    }
                    return temp;
                });
                studentObj.Details = result;
                alert("Updated Successfully!");
            }
        } else alert("No match found!");
    }
}

//Printing the output
function viewStudentInfo() {
    console.table(studentObj.Details);
}
function viewFacultyInfo() {
    console.table(facultyObj.Details);
}
function viewCourseInfo() {
    console.table(courseObj.Details);
}