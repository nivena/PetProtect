/*
// components/transactions/Transactions.tsx

export default function Transactions({
  transactions,
  loading,
}: {
  transactions: any[];
  loading: boolean;
}) {
  // ✅ Determine text color based on status
  const getStatusColor = (status: string) => {
    return status === "Completed"
      ? "text-green-500"
      : status === "Pending"
      ? "text-yellow-500"
      : "text-red-500";
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">💳 Transaction History</h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="text-center bg-white hover:bg-gray-50 transition">
                <td className="border p-2">{tx.type}</td>
                <td className="border p-2">
                  {tx.amount ? `${tx.amount} shares` : "—"}
                </td>
                <td className={`border p-2 font-semibold ${getStatusColor(tx.status)}`}>
                  {tx.status}
                </td>
                <td className="border p-2">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
*/
