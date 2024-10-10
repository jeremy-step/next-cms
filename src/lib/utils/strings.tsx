export const dateLeadingZero = (value: number) => {
  return ("0" + value).slice(-2);
};

export const getDateLegible = (_date: Date) => {
  const date = new Date(_date);

  return (
    <div className="flex justify-between gap-2">
      <span>
        {`${dateLeadingZero(date.getHours())}:${dateLeadingZero(
          date.getMinutes()
        )}`}
      </span>
      <span>
        {`${dateLeadingZero(date.getDate())}/${dateLeadingZero(
          date.getMonth() + 1
        )}/${date.getFullYear()}`}
      </span>
    </div>
  );
};

export const getDate = (_date: Date) => {
  const date = new Date(_date);

  return `${date.getFullYear()}-${dateLeadingZero(
    date.getMonth() + 1
  )}-${dateLeadingZero(date.getDate())}${dateLeadingZero(
    date.getHours()
  )}:${dateLeadingZero(date.getMinutes())}`;
};
