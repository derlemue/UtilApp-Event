/////////////////////////////////////////////////////////////////////***
//
// UtilApp-Call | calc_duration.gs | RC1
//
/////////////////////////////////////////////////////////////////////***
//
// Send Emails on Google Form Submit, get content, parse and send
// to given Address List
//
//
// by T. Ledermueller (derlemue.com) | License: GNU GPL-3.0
//
/////////////////////////////////////////////////////////////////////***

///
///	Trigger to fire when new row is added to Google Sheet
///
	function onFormSubmit(e){
	Logger.log("[METHOD] onFormSubmit");
	calcTime();
	}
    
///	Script to calcutlate and parse duration from Sheet and back to it
/// 
function calcTime() {
    Logger.log("Start")

/// set variables (shortcuts for Google App Script Classes)
    var ws_input = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
    var data_input = ws_input.getRange("D" + ws_input.getLastRow() + ":E" + ws_input.getLastRow()).getValues();
    
/// set variables (define sources on Google Sheet)  
/// set range from column 5-6 and set row from "last"-"last"
      var lastRow = ws_input.getLastRow();

      var vTime1F = Date.parse(ws_input.getSheetValues(lastRow, 4, 1, 1));
      var vTime2F = Date.parse(ws_input.getSheetValues(lastRow, 5, 1, 1));

      Logger.log(vTime1F)
      Logger.log(vTime2F)

      
      if (Number.isNaN(vTime2F)){ Logger.log("Input Fail");
      var cell = ws_input.getRange(ws_input.getLastRow(),13);
      cell.setValue("calc failed");
      return Number.isNaN(vTime2F)
      } else {


//      var vTime1 = "01:00"
//      var vTime2 = "01:15"
                var vTime1 = Utilities.formatDate(new Date(vTime1F), "Europe/Berlin", "HH:mm");
                var vTime2 = Utilities.formatDate(new Date(vTime2F), "Europe/Berlin", "HH:mm");
      Logger.log(vTime1)
      Logger.log(vTime2)
   //   Logger.log(!isValidHour(vTime1))
   //   Logger.log(!isValidHour(vTime2))
      
/// split times in hours and minutes
      var h1 = vTime1.split(":");      
      var h2 = vTime2.split(":");
      var h = 0;
      var m = 0;
      Logger.log(h1);
      Logger.log(h2);
      
/// calculate differences of hours and minutes
      var vh = (h2[0] - h1[0]);
      var vm = (h2[1] - h1[1]);
      Logger.log(vh)
      Logger.log(vm)
      
/// set variables for manipulation (if needed)
      var h = vh
      var m = vm
/// if hours are negative add 24 hours
      if (vh < 0) {
        var h = (vh + 24);
        }
/// if hours are 0 take minutes as absolute
      if (vh == 0) {
        var m = Math.abs((vm));
        if (vm < 0) {
            var h = (h + 24)
            }
        var h = (h)
        }
        
/// if minutes are negative add 60 minutes and pull off 1 hour
      if (vm < 0) {
        var m = (vm + 60);
        if (h < 0) {
            var h = (h + 23);
        }
        var h = (h - 1)
        }
      Logger.log(h)
      Logger.log(m)
      Logger.log(h+":"+m)
/// renunite hours and minutes
      var vDuration = (h+":"+m)
      Logger.log(vDuration)
/// parse to sheet
      var cell = ws_input.getRange(ws_input.getLastRow(),13);
      cell.setValue(vDuration+":00");
      return vDuration;
}

///
/// check if hours are valid
///
//function isValidHour(hour) {
//    hourPattern = "^([01]?[0-9]|2[0-3]):[0-5][0-9]$";
//    if (hour.match(hourPattern)) {return true;}
//    return false;
//}
};