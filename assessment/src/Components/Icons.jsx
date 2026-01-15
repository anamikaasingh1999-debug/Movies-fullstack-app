import React from "react";
import logoutBtn from "../assets/Images/logoutBtn.png";

export const PlusIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

export const LogoutIcon = () => (
  <img src={logoutBtn} alt="Logout" width="20" height="20" /> 
);

export const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
