// src/pages/DashboardHome.jsx
import React from "react";

export default function DashboardHome() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Dashboard Overview</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text display-6">128</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">APIs Generated</h5>
              <p className="card-text display-6">72</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Active Sessions</h5>
              <p className="card-text display-6">14</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
