function myFunction() {
  var inputs = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getDataRange().getValues();

  Logger.log(inputs);

  var schedule = CalendarApp.getDefaultCalendar();

  for (var i = 1; i < inputs.length; i++) {
    var line = inputs[i];

    var day = line[10];
    var startTime = line[11];
    var endTime = line[12];
    var title = line[5];
    var descriptionDenounces = line[8];


    //Formatting Start and End Date
    var startDate = new Date(day.split("-")[0],day.split("-")[1]-1,day.split("-")[2]);
    var endDate = new Date(day.split("-")[0],day.split("-")[1]-1,day.split("-")[2]);

    startDate.setHours(startTime.split(":")[0], startTime.split(":")[1]);
    endDate.setHours(endTime.split(":")[0], endTime.split(":")[1]);

    //Configures event color
    var color;

    switch (title) {
      case "Curso D'água":
        color = CalendarApp.EventColor.CYAN;
        break;

      case "Desmatamento":
        color = CalendarApp.EventColor.YELLOW;
        break;

      case "Invasão":
        color = CalendarApp.EventColor.ORANGE;
        break;

      case "Maus Tratos":
        color = CalendarApp.EventColor.RED;
        break;

      case "Resíduos":
        color = CalendarApp.EventColor.GRAY;
        break;

      default:
        color = CalendarApp.EventColor.PALE_BLUE;
    }

    var event = schedule.createEvent(title, startDate, endDate, {description:descriptionDenounces});
    event.setColor(color);
  }
}
