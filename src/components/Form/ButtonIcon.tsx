import React, { useState } from "react";
import styles from "./form.module.scss";

type Props = {
  onToggle: () => void;
};

export function BtnIcon({ onToggle }: Props) {
  // const [showMe, setShowMe] = useState(false);

  return (
    <>
      <button onClick={onToggle} className={styles.btnIcon}>
        <div className="test2">
          <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
            <path
              d="M13.706 9.698a.988.988 0 000-1.407 1.01 1.01 0 00-1.419 0l-2.965 2.94a1.09 1.09 0 000 1.548l2.955 2.93a1.01 1.01 0 001.42 0 .988.988 0 000-1.407l-2.318-2.297 2.327-2.307z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
        </div>
      </button>
    </>
  );
}
