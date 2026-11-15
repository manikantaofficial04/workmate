import React from "react";
import {
  ArrowLeft,
  Laptop,
  Smartphone,
  Monitor,
  CreditCard,
  Headphones,
  Package,
  ShieldCheck,
} from "lucide-react";

import "./OfficeAssets.css";

function OfficeAssets({ user, onBack }) {

  const assets = [
    {
      id: 1,
      name: "Company Laptop",
      category: "Laptop",
      assetId: "WM-LAP-001",
      assignedDate: "Not provided",
      status: "Assigned",
      icon: Laptop,
    },
    {
      id: 2,
      name: "Company ID Card",
      category: "Identity",
      assetId: "WM-ID-001",
      assignedDate: "Not provided",
      status: "Assigned",
      icon: CreditCard,
    },
    {
      id: 3,
      name: "Headphones",
      category: "Accessories",
      assetId: "WM-ACC-001",
      assignedDate: "Not provided",
      status: "Assigned",
      icon: Headphones,
    },
  ];

  return (
    <main className="office-assets-page">

      <header className="office-assets-header">

        <button
          className="office-assets-back"
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <h1>Office Assets</h1>

      </header>


      <section className="office-assets-content">

        <div className="office-assets-profile">

          <div className="office-assets-avatar">
            <Package size={34} />
          </div>

          <h2>{user?.fullName || "Employee"}</h2>

          <p>
            Employee ID: {user?.employeeId || "Not available"}
          </p>

        </div>


        <div className="office-assets-heading">

          <h3>MY ASSIGNED ASSETS</h3>

          <span>{assets.length} Assets</span>

        </div>


        <div className="office-assets-list">

          {assets.map((asset) => {

            const Icon = asset.icon;

            return (
              <article className="office-asset-card" key={asset.id}>

                <div className="office-asset-icon">
                  <Icon size={23} />
                </div>

                <div className="office-asset-info">

                  <h4>{asset.name}</h4>

                  <p>{asset.category}</p>

                  <span>Asset ID: {asset.assetId}</span>

                  <small>
                    Assigned Date: {asset.assignedDate}
                  </small>

                </div>

                <span className="office-asset-status">
                  <ShieldCheck size={13} />
                  {asset.status}
                </span>

              </article>
            );

          })}

        </div>


        <div className="office-assets-note">

          <ShieldCheck size={18} />

          <p>
            These are demo asset records. Actual company asset
            information will be connected later.
          </p>

        </div>

      </section>

    </main>
  );
}

export default OfficeAssets;