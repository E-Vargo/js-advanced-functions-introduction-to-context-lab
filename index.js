// Your code here
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeesInfo){
    return employeesInfo.map(function(info){
        return createEmployeeRecord(info)
    })
}

function createTimeInEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ')

    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function createTimeOutEvent(employee, dateTime){
    let [date, hour] = dateTime.split(' ')

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function hoursWorkedOnDate(employeeRecord, workedDate){

    let clockIn = employeeRecord.timeInEvents.find(function(e){
        return e.date === workedDate
    })

    let clockOut = employeeRecord.timeOutEvents.find(function(e){
        return e.date === workedDate
    })

    return ((clockOut.hour) - (clockIn.hour)) / 100
    
}

function wagesEarnedOnDate(employeeRecord, workedDate){
    let hours = hoursWorkedOnDate(employeeRecord, workedDate)
    let hourlyRate = employeeRecord.payPerHour
    return hours * hourlyRate
}

function allWagesFor(employeeRecord){
    let workDays = employeeRecord.timeInEvents.map((e) => e.date)

    let wages = workDays.reduce(function(memo, e){
        return memo + wagesEarnedOnDate(employeeRecord, e)
    }, 0)
    return wages
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}

function findEmployeeByFirstName(array, name){
    return array.find(function(e){
        return e.firstName === name
    })
}