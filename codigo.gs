function createRegister() {
  const spreadsheetG = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const inputs = spreadsheetG.getDataRange().getValues();

  const schedule = CalendarApp.getDefaultCalendar();

  for (let i = 1; i < inputs.length; i++) {
    const line = inputs[i];
    const sync = line[19];

    if (sync == "SIM") {
      continue;
    }

    const title = line[5];
    const location = line[7];
    const descriptionDenounces = "Descrição: " + line[8] + "\nLocal: " + location;
    const day = line[10];
    const startTime = Utilities.formatDate(new Date(line[11]), Session.getScriptTimeZone(), 'HH:mm:ss');
    const endTime = Utilities.formatDate(new Date(line[12]), Session.getScriptTimeZone(), 'HH:mm:ss');

    //Formatting Start and End Date
    const startDate = new Date(day);
    startDate.setHours(startTime.split(":")[0], startTime.split(":")[1]);

    const endDate = new Date(day);
    endDate.setHours(endTime.split(":")[0], endTime.split(":")[1]);

    //Configures event color
    let color;

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

    const event = schedule.createEvent(title, startDate, endDate, { description: descriptionDenounces });
    event.setColor(color);

    //Update Column 'Sincronizado'
    spreadsheetG.getRange(i + 1, 20).setValue("SIM");
  }
}
