function createRegister() {
  var spreadsheetG = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var inputs = spreadsheetG.getDataRange().getValues();

  var schedule = CalendarApp.getDefaultCalendar();

  for (var i = 1; i < inputs.length; i++) {
    var line = inputs[i];
    var sync = line[19];

    if (sync != "SIM") {
      var title = line[5];
      var location = line[7];
      var descriptionDenounces = "Descrição: " + line[8] + "\nLocal: " + location;
      var day = line[10];
      var startTime = Utilities.formatDate(new Date(line[11]), Session.getScriptTimeZone(), 'HH:mm:ss');
      var endTime = Utilities.formatDate(new Date(line[12]), Session.getScriptTimeZone(), 'HH:mm:ss');

      //Formatting Start and End Date
      var startDate = new Date(day);
      startDate.setHours(startTime.split(":")[0], startTime.split(":")[1]);

      var endDate = new Date(day);
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

      var event = schedule.createEvent(title, startDate, endDate, { description: descriptionDenounces });
      event.setColor(color);

      //Update Column 'Sincronizar'
      spreadsheetG.getRange(i + 1, 20).setValue("SIM");
    }
  }
}
