import React from "react";
import "../styles.css";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">
      <p>© {currentYear} MovieDux. All rights reserved.</p>
      <p>Created by Jahnavi</p>
    </div>
  );
}
