export const dummySimRequests = [
  {
    id: 1,
    order_no: "ORD001",
    details: [
      { name: "Operator One", amount: 10, operator_id: 1 },
      { name: "Operator Two", amount: 5, operator_id: 2 }
    ],
    order_date: "2025-01-15",
    status: "pending"
  },
  {
    id: 2,
    order_no: "ORD002",
    details: [
      { name: "Operator One", amount: 8, operator_id: 1 }
    ],
    order_date: "2025-02-20",
    status: "approved"
  }
];