import React, { useEffect, useState } from 'react'
import { getAllTransaction } from '../../service/TransactionService';
import { toast } from 'react-toastify';
import { getCurrentUserDetails } from '../../auth/Index';
import './css/Cashback.css';

const Cashback = () => {
    const [user, setUser] = useState(undefined);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = getCurrentUserDetails();
        setUser(currentUser);

        if (currentUser) {
            getAllTransaction()
                .then((response) => {
                    if (response && Array.isArray(response)) {
                        setTransactions(response);
                    } else {
                        toast.info("No transactions found");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error fetching transactions");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getAmountColor = (amount) => {
        return amount >= 0 ? 'text-green-500' : 'text-red-500';
    };

    const getTransactionType = (amount) => {
        return amount >= 0 ? 'Credit' : 'Debit';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="cashback-container p-4">
            <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

            {transactions.length === 0 ? (
                <div className="no-transactions text-center py-8">
                    <div className="text-gray-500 text-lg mb-2">No transactions found</div>
                    <div className="text-gray-400">You haven't made any transactions yet.</div>
                </div>
            ) : (
                <div className="transaction-grid">
                    {transactions.map((transaction, index) => (
                        <div key={index} className="transaction-card">
                            <div className="transaction-header">
                                <span className={`transaction-type ${getAmountColor(transaction.amount)}`}>
                                    {getTransactionType(transaction.amount)}
                                </span>
                                <span className="transaction-date">
                                    {formatDate(transaction.date)}
                                </span>
                            </div>

                            <div className="transaction-body">
                                <div className="transaction-amount">
                                    <span className={`amount ${getAmountColor(transaction.amount)}`}>
                                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount}
                                    </span>
                                </div>

                                <div className="transaction-details">
                                    <div className="detail-row">
                                        <span className="detail-label">Payment Mode:</span>
                                        <span className="detail-value">{transaction.paymentMode}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="detail-label">Bank:</span>
                                        <span className="detail-value">{transaction.bank}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Cashback;