let UtilsGenerate = {
    LogFile: function (logPath) {
        let date = this.DateWithTimezone();
        let dateSplit = date.toISOString().split("T");
        return logPath + dateSplit[0] + "-" + date.getTime() + ".txt"
    },
    DateWithTimezone: function () {
        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        return yourDate;
    }
}

module["exports"] = UtilsGenerate;