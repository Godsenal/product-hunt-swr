import React, { useState } from "react";
import styles from "styles/selector.module.css";

type Props = {
  onSelect: ({ year, month }: { year: number; month: number }) => void;
};
const CDate = new Date();
const CYear = CDate.getFullYear();
const CMonth = CDate.getMonth() + 1;

const BASE_YEAR = 2000;

const YEAR_OPTIONS = [...Array(CYear - BASE_YEAR + 1)].map(
  (_, i) => i + BASE_YEAR
);
const MONTH_OPTIONS = [...Array(12)].map((_, i) => i + 1);

const MonthSelector: React.FC<Props> = ({ onSelect }) => {
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(CYear);
  const [month, setMonth] = useState(CMonth);

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = e =>
    setYear(Number(e.target.value));
  const handleMonthChange = (month: number) => () => {
    setMonth(month);
    setOpen(false);
    onSelect({ year, month });
  };

  return (
    <div style={{ position: "relative" }}>
      <button className={styles.button} onClick={() => setOpen(prev => !prev)}>
        {year}.{month}
      </button>
      {open && (
        <div className={styles.container}>
          <select
            className={styles.selector}
            value={year}
            onChange={handleYearChange}
          >
            {YEAR_OPTIONS.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div>
            {MONTH_OPTIONS.map(monthItem => (
              <button
                className={styles.month}
                key={monthItem}
                onClick={handleMonthChange(monthItem)}
              >
                {monthItem}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthSelector;
