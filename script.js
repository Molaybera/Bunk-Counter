document.getElementById("calculate-btn").addEventListener("click", function () {
    // Get values from inputs
    let requiredPercentage = parseFloat(document.getElementById("percentage-required").value);
    let attendedClasses = parseInt(document.getElementById("attended-classes").value);
    let totalClasses = parseInt(document.getElementById("total-conducted-class").value);

    // Validation check
    if (isNaN(requiredPercentage) || isNaN(attendedClasses) || isNaN(totalClasses) || requiredPercentage <= 0 || totalClasses <= 0) {
        document.getElementById("result").innerHTML = "<p style='color: red;'>Please enter valid numbers.</p>";
        return;
    }

    // Calculate current attendance
    let currentAttendance = (attendedClasses / totalClasses) * 100;

    // Remaining classes
    let remainingClasses = totalClasses - attendedClasses;

    // If current attendance is below required percentage
    if (currentAttendance < requiredPercentage) {
        // Calculate how many more classes they need to attend
        let requiredClasses = Math.ceil((requiredPercentage * totalClasses - 100 * attendedClasses) / (100 - requiredPercentage));

        if (requiredClasses > remainingClasses) {
            // If they can't reach the required percentage
            document.getElementById("result").innerHTML = `
                <p style='color: red;'>Your attendance is too low! Even if you attend all <strong>${remainingClasses}</strong> remaining classes, you won't reach <strong>${requiredPercentage}%</strong>.</p>
                <p>Current Attendance: <strong>${attendedClasses}/${totalClasses} → ${currentAttendance.toFixed(2)}%</strong></p>
            `;
        } else {
            let bunkableAfterAttending = remainingClasses - requiredClasses;
            document.getElementById("result").innerHTML = `
                <p style='color: red;'>You need to attend <strong>${requiredClasses}</strong> more classes to reach <strong>${requiredPercentage}%</strong>.</p>
                <p>After attending, you can bunk <strong>${bunkableAfterAttending}</strong> more classes.</p>
                <p>Current Attendance: <strong>${attendedClasses}/${totalClasses} → ${currentAttendance.toFixed(2)}%</strong></p>
                <p>Classes Left to Attend: <strong>${requiredClasses} / ${remainingClasses}</strong></p>
            `;
        }
        return;
    }

    // Find max bunkable classes
    let maxBunks = 0;
    let futureAttendance = currentAttendance;

    while (futureAttendance >= requiredPercentage) {
        maxBunks++;
        futureAttendance = (attendedClasses / (totalClasses + maxBunks)) * 100;
    }

    maxBunks--; // Reduce by 1 because last iteration went below required percentage

    // Ensure maxBunks is not negative
    if (maxBunks < 0) maxBunks = 0;

    // Display result
    document.getElementById("result").innerHTML = `
        <p>You can bunk for <strong>${maxBunks}</strong> more classes.</p>
        <p>Current Attendance: <strong>${attendedClasses}/${totalClasses} → ${currentAttendance.toFixed(2)}%</strong></p>
        <p>Attendance After Bunking: <strong>${attendedClasses}/${totalClasses + maxBunks} → ${futureAttendance.toFixed(2)}%</strong></p>
    `;
});
