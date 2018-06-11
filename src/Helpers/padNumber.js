export default function padNumber(size, n) {
    let strNumber = n.toString();
    while (strNumber.length < size) {
        strNumber = '0' + strNumber;
    }

    return strNumber;
}
