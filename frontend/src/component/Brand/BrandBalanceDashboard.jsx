import React, { useEffect, useState } from "react";
import { getCurrentUserDetails } from "../../auth/Index";
import { balanceInfo } from "../../service/BalanceInfo";
import { creditMoney } from "../../service/TransactionService"; // Assume this is your API
import { toast } from "react-toastify";

const BrandBalanceDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState({
    amount: "",
    bank: "",
    paymentMode: "UPI", // Default
  });

  useEffect(() => {
    const user = getCurrentUserDetails();
    setCurrentUser(user);

    if (user) {
      balanceInfo(user.userId)
        .then((response) => setBalanceData(response))
        .catch((err) => {
          console.error(err);
          setError("Error fetching balance");
        });
    }
  }, []);

  // Input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!transaction.amount || isNaN(transaction.amount)) {
      setError("Please enter a valid amount");
      setLoading(false);
      return;
    }

    if (!currentUser?.userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    creditMoney(currentUser.userId, transaction)
      .then(() => {
        toast.success("Money loaded successfully!");
        // Reset form
        setTransaction({ amount: "", bank: "", paymentMode: "UPI" });
        // Refresh balances
        return balanceInfo(currentUser.userId).then((response) =>
          setBalanceData(response)
        );
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load money");
        toast.error("Failed to load money");
      })
      .finally(() => {
        setLoading(false);
        // Close modal programmatically
        const modalEl = document.getElementById("addFundsModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl);
        if (modal) modal.hide();
      });
  };

  if (!balanceData) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="alert alert-info">Balance Rs: 0.00</div>
      </div>
    );
  }

  return (
    <>
      {/* Balance Section */}
      <div className="balance-glass card border-0 shadow-lg">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="mb-1 text-white-50">Account Balance</h5>
              <h2 className="fw-bold text-white mb-0">
                ₹{balanceData.totalBalance.toFixed(2)}
              </h2>
            </div>

            {/* Button that opens modal */}
            <button
              className="btn btn-light btn-sm rounded-pill px-3 glass-btn"
              data-bs-toggle="modal"
              data-bs-target="#addFundsModal"
            >
              <i className="bi bi-wallet2 me-1"></i>Add Funds
            </button>
          </div>

          {/* KPI Row */}
          <div className="row g-3 mt-1">
            <div className="col-12 col-md-4">
              <div className="kpi-tile kpi-total d-flex align-items-center">
                <div className="kpi-icon me-2">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <div className="kpi-text">
                  <small className="text-white-50 d-block">Total</small>
                  <span className="kpi-value text-danger">
                    ₹{balanceData.totalBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="kpi-tile kpi-spent d-flex align-items-center">
                <div className="kpi-icon me-2">
                  <i className="bi bi-currency-exchange"></i>
                </div>
                <div className="kpi-text">
                  <small className="text-white-50 d-block">Spent</small>
                  <span className="kpi-value text-danger-emphasis">
                    ₹{balanceData.spendBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="kpi-tile kpi-available d-flex align-items-center">
                <div className="kpi-icon me-2">
                  <i className="bi bi-cash-stack"></i>
                </div>
                <div className="kpi-text">
                  <small className="text-white-50 d-block">Available</small>
                  <span className="kpi-value text-success-emphasis">
                    ₹{(balanceData.totalBalance - balanceData.spendBalance).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="d-flex justify-content-between align-items-center mt-4 pt-2 border-top border-white-10">
            <small className="text-white-50">
              Last updated: {new Date().toLocaleString()}
            </small>
            <div className="d-flex gap-2">
              <span className="badge rounded-pill chip chip-outline">Finance</span>
              <span className="badge rounded-pill chip chip-outline">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="addFundsModal"
        tabIndex="-1"
        aria-labelledby="addFundsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addFundsModalLabel">
                Add Funds
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    value={transaction.amount}
                    onChange={handleInputChange}
                    placeholder="Enter amount"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bank" className="form-label">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="bank"
                    name="bank"
                    value={transaction.bank}
                    onChange={handleInputChange}
                    placeholder="Enter bank name"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="paymentMode" className="form-label">
                    Payment Mode
                  </label>
                  <select
                    className="form-select"
                    id="paymentMode"
                    name="paymentMode"
                    value={transaction.paymentMode}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="UPI">UPI</option>
                    <option value="NET_BANKING">Net Banking</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="CREDIT_CARD">Credit Card</option>
                  </select>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      "Load Money"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandBalanceDashboard;
