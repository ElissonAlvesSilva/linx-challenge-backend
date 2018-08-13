function onlyNumbers(e) {
    const control_key = (window.event) ? event.keyCode : e.which;
    if ((control_key > 47 && control_key < 58)) {
        return true;
    } else {
        if (control_key === 8 || control_key === 0) {
            return true;
        } else {
            return false;
        }
    }
}