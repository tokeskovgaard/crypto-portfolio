export default function (name: any, value: any) {
    const date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = '; expires=' + date.toUTCString();
    document.cookie = name + '=' + value + expires + '; path=/';
}
