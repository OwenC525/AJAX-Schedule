$(document).ready(function () {
    const btn = $("#submitDay");

    //letter days and what periods it shows
    const letterDays = {
        A: [1, 2, 3, "Lunch", 5, 6],
        B: [4, 1, 2, "Lunch", 7, 5],
        C: [3, 4, 1, "Lunch", 6, 6],
        D: [2, 3, 4, "Lunch", 5, 6],
        E: [1, 2, 3, "Lunch", 7, 5],
        F: [4, 1, 2, "Lunch", 6, 7],
        G: [3, 4, 7, "Lunch", 5, 6]
    }

    //Times for each block
    const bellSchedule = {
        1: { start: '8:24 AM', end: '9:31 AM' },
        2: { start: '9:36 AM', end: '10:43 AM' },
        3: { start: '10:48 AM', end: '11:55 AM' },
        lunch: { start: '11:55 AM', end: '12:35 PM' },
        4: { start: '12:41 PM', end: '1:48 PM' },
        5: { start: '1:53 PM', end: '3:00 PM' }
    };

    
    btn.on("click", function () {

    const selectedDay = $('#dayInput').val();

    $.ajax({
        url: `https://api.npoint.io/b2c490c2b2712afde810`,
        method: 'GET',
  
        success: function (data) {
            const schedule = data.schedule
            const daySchedule = letterDays[selectedDay];
            $('#scheduleList').empty();
            
            let bellIndex = 1;

            daySchedule.forEach(function (period) {
                if (period === "Lunch") {
                    const lunchTime = bellSchedule.lunch;
                    $('#scheduleList').append(`
                        <tr>
                            <td>Lunch</td>
                            <td>${lunchTime.start} - ${lunchTime.end}</td>
                            <td colspan="3">Lunch Break</td>
                        </tr>
                    `);//adds lunch
                } else {
                    // grabs info for each period
                    const periodData = schedule.find(function (item) {
                        return item.period === period && item.days.includes(selectedDay);
                    });
                    if (periodData) {
                        const time = bellSchedule[bellIndex]; // gets time
                        $('#scheduleList').append(`
                            <tr>
                                <td>${period}</td>
                                <td>${time.start} - ${time.end}</td>
                                <td>${periodData.class}</td>
                                <td>${periodData.teacher}</td>
                                <td>${periodData.room}</td>
                            </tr>
                        `);
                        bellIndex++; //move to the next bell time
                    }
                }
            })

        },
        error: function () {
            alert("Error");
        }
    })
    
});
})