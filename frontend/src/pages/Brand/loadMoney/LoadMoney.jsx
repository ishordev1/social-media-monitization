import React, { useState, useEffect } from 'react';
import { creditMoney } from '../../../service/TransactionService';
import { getCurrentUserDetails } from '../../../auth/Index';
import { toast } from 'react-toastify';

const LoadMoney = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [transaction, setTransaction] = useState({
        amount: "",
        bank: "",
        paymentMode: "UPI", // Default payment mode
    });

    useEffect(() => {
        const user = getCurrentUserDetails();
        setCurrentUser(user);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTransaction(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
            .then((response) => {
                toast.success("Money loaded successfully!");
                // Reset form after successful submission
                setTransaction({
                    amount: "",
                    bank: "",
                    paymentMode: "UPI",
                });
            })
            .catch((error) => {
                console.error(error);
                setError(error.response?.data?.message || "Failed to load money");
                toast.error("Failed to load money");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="card-title mb-0">Load Money to Wallet</h2>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

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
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
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
        </div>
    );
};

export default LoadMoney;