export const YearsList = (maxYear) => {
    var max = maxYear || 50;

    let CurDate = new Date();
    let CurYear = CurDate.getFullYear();
    let DateArray = [CurYear]

    for (let index = 0; index < max; index++) {

        DateArray.push(CurYear + (index + 1))

    }

    return DateArray
}
