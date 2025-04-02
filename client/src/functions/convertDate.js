import dayjs from "dayjs";

export default function (dateFromPostgres){
    return dayjs(dateFromPostgres).format('DD-MM-YYYY');
}