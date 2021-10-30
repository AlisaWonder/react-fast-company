export function calculateDate(timestamp) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const dateComment = new Date(Number(timestamp));
    const commentYear = dateComment.getFullYear();
    const difference = currentDate - Number(timestamp);
    const sec = difference / 1000;
    const min = sec / 60;
    const hours = min / 60;
    const days = hours / 24;

    let options = { hour: "numeric", minute: "numeric" };
    if (days >= 1) {
        options = { day: "numeric", month: "long" };
    }
    if (currentYear > commentYear) {
        options = { day: "numeric", month: "long", year: "numeric" };
    }
    return dateComment.toLocaleString("ru", options);
}
