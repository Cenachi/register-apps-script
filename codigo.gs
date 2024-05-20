function createRegister() {
  const spreadsheetG = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const inputs = spreadsheetG.getDataRange().getValues();

  const schedule = CalendarApp.getDefaultCalendar();

  inputs.forEach((line, i) => {
    const isSyncronized = line[19];

    //Skip the header row
    if (isSyncronized == "SIM" || i == 0) {
      return;
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
    const colors = {
      "Curso D'água": CalendarApp.EventColor.CYAN,
      "Desmatamento": CalendarApp.EventColor.YELLOW,
      "Invasão": CalendarApp.EventColor.ORANGE,
      "Maus Tratos": CalendarApp.EventColor.RED,
      "Resíduos": CalendarApp.EventColor.GRAY,
      default: CalendarApp.EventColor.PALE_BLUE
    };

    const event = schedule.createEvent(title, startDate, endDate, { description: descriptionDenounces });
    event.setColor(colors[title] || colors.default);

    //Update Column 'Sincronizado'
    spreadsheetG.getRange(i + 1, 20).setValue("SIM");
  });
}