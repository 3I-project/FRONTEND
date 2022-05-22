const parseDate = (d) => {
    const date = new Date(d);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const pMn = (`0${month}`).substr(-2);
    const pD = (`0${day}`).substr(-2);
    const pH = (`0${hours}`).substr(-2);
    const pM = (`0${minutes}`).substr(-2);
    const pS =  (`0${seconds}`).substr(-2);

    return {
        year,
        pMn,
        pD,
        pH,
        pM,
        pS
    }
}

export default parseDate;
