"use client"

import { useState } from "react"
import { CreditCard, Download, Calendar, Filter } from "lucide-react"
import "../css/Payment.css"

export default function Payments({ requests }) {
  const [filter, setFilter] = useState("all")
  const [dateRange, setDateRange] = useState("all")

  // TODO: Backend connection - Fetch payment history
  // GET /api/payments/user/:userId
  // Response: { payments: [...], totalSpent, monthlySpent }

  const payments =
    requests?.map((request) => ({
      id: request.id,
      service: request.service,
      agent: request.agent,
      amount: request.amount,
      date: request.date,
      status: request.status === "Completed" ? "Paid" : "Pending",
      paymentMethod: "Cash",
      transactionId: `TXN${request.id}${Math.floor(Math.random() * 1000)}`,
    })) || []

  const totalSpent = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, payment) => sum + Number.parseInt(payment.amount.replace("₹", "")), 0)

  const monthlySpent = payments
    .filter((p) => p.status === "Paid" && new Date(p.date).getMonth() === new Date().getMonth())
    .reduce((sum, payment) => sum + Number.parseInt(payment.amount.replace("₹", "")), 0)

  const filteredPayments = payments.filter((payment) => {
    if (filter !== "all" && payment.status.toLowerCase() !== filter) return false

    if (dateRange !== "all") {
      const paymentDate = new Date(payment.date)
      const now = new Date()

      switch (dateRange) {
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return paymentDate >= weekAgo
        case "month":
          return paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()
        case "year":
          return paymentDate.getFullYear() === now.getFullYear()
        default:
          return true
      }
    }

    return true
  })

  const handleDownloadReceipt = (paymentId) => {
    // TODO: Backend connection - Generate and download receipt
    // GET /api/payments/:paymentId/receipt
    alert("Receipt download feature will be implemented!")
  }

  const handlePayNow = (paymentId) => {
    // TODO: Backend connection - Process payment
    // POST /api/payments/:paymentId/pay
    // Integration with payment gateway (Razorpay, etc.)
    alert("Payment gateway integration will be implemented!")
  }

  return (
    <div className="payments">
      <div className="page-header">
        <h1>Payment History</h1>
        <p>आपकी सभी payments की जानकारी</p>
      </div>

      <div className="payment-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <CreditCard />
          </div>
          <div className="stat-content">
            <h3>Total Spent</h3>
            <div className="stat-value">₹{totalSpent}</div>
            <div className="stat-label">All time</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon monthly">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3>This Month</h3>
            <div className="stat-value">₹{monthlySpent}</div>
            <div className="stat-label">
              {
                payments.filter((p) => p.status === "Paid" && new Date(p.date).getMonth() === new Date().getMonth())
                  .length
              }{" "}
              transactions
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <Filter />
          </div>
          <div className="stat-content">
            <h3>Pending</h3>
            <div className="stat-value">{payments.filter((p) => p.status === "Pending").length}</div>
            <div className="stat-label">Unpaid services</div>
          </div>
        </div>
      </div>

      <div className="payment-filters">
        <div className="filter-group">
          <label>Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range:</label>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="payments-list">
        {filteredPayments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💳</div>
            <h3>No payments found</h3>
            <p>कोई payment history नहीं मिली।</p>
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <div key={payment.id} className="payment-card">
              <div className="payment-header">
                <div className="payment-info">
                  <h3>{payment.service}</h3>
                  <div className="payment-meta">
                    <span>Agent: {payment.agent}</span>
                    <span>•</span>
                    <span>{payment.date}</span>
                  </div>
                </div>
                <div className="payment-amount">
                  <div className="amount">{payment.amount}</div>
                  <div className={`payment-status ${payment.status.toLowerCase()}`}>{payment.status}</div>
                </div>
              </div>

              <div className="payment-details">
                <div className="detail-row">
                  <span>Transaction ID:</span>
                  <span className="transaction-id">{payment.transactionId}</span>
                </div>
                <div className="detail-row">
                  <span>Payment Method:</span>
                  <span>{payment.paymentMethod}</span>
                </div>
              </div>

              <div className="payment-actions">
                {payment.status === "Paid" ? (
                  <button className="btn btn-outline" onClick={() => handleDownloadReceipt(payment.id)}>
                    <Download className="btn-icon" />
                    Download Receipt
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handlePayNow(payment.id)}>
                    <CreditCard className="btn-icon" />
                    Pay Now
                  </button>
                )}
                <button className="btn btn-outline">View Details</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
