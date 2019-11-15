import React from "react";
import { Link, useHistory } from "react-router-dom";
import { MonthSelector } from "components";
import styles from "styles/header.module.css";

const Header = () => {
  const history = useHistory();
  const onSelect = ({ year, month }: { year: number; month: number }) =>
    history.push(`/${year}/${month}`);
  return (
    <div className={styles.header}>
      <div style={{ flex: 1 }}>
        <Link className={styles.link} to="/">
          Month hunt
        </Link>
      </div>
      <MonthSelector onSelect={onSelect} />
    </div>
  );
};

export default Header;
