module.exports = {
    convertDate: function(time) {
        let newTime = new Date(time);
        let day = newTime.getDay();
        let date = newTime.getDate();
        let month = newTime.getMonth();
        let year = newTime.getFullYear();
        let hours = newTime.getHours();
        let rawMinutes = newTime.getMinutes();
        let minutes = "";
        if (String(rawMinutes).length === 1) {
            minutes = "0" + String(rawMinutes);
        } else {
            minutes = String(rawMinutes);
        }
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${days[day]}, ${date}-${months[month]}-${year}, ${hours}:${minutes}`;
    }
}
