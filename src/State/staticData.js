const users = [
  {
    email: 'admin@iw.com',
    password: 'test1234',
    type: 'admin',
  },
  {
    email: 'manager@iw.com',
    password: 'test1234',
    type: 'manager'
  },
  [
    {
      email: 'visitor@iw.com',
      password: 'test1234',
      type: 'visitor',
    }
  ],
  [
    {
      email: 'customer@iw.com',
      password: 'test1234',
      type: 'customer'
    }
  ]
];

const customers = [
  { id: 1, date: '2021-01-10', name: 'John Doe', mobileNo: '7458967812', address: 'Kerby St, Arlington', gender: 'Male' },
];

const employees = [
  { id: 1, date: '2021-01-10', name: 'Von Foo', type: 'Cashier', mobileNo: '7458967832', address: 'Kerby St, Arlington', gender: 'Male', last4SSN: '1234' },
  { id: 2, date: '2021-01-10', name: 'Ton Foo ', type: 'Manager', mobileNo: '7458967213', address: 'Kerby St, Arlington', gender: 'Male', last4SSN: '1235' },
  { id: 3, date: '2021-02-10', name: 'Gon Foo', type: 'LaundryMan', mobileNo: '7451111812', address: 'Kerby St, Arlington', gender: 'Male', last4SSN: '1236' },
  { id: 4, date: '2021-01-11', name: 'Won Foo', type: 'Manager', mobileNo: '74589674556', address: 'Kerby St, Arlington', gender: 'Male', last4SSN: '1237' },
  { id: 5, date: '2021-05-11', name: 'Bon Boo', type: 'LaundryMan', mobileNo: '456121121209', address: 'Kerby St, Arlington', gender: 'Male', last4SSN: '1238' },
  { id: 6, date: '2021-04-12', name: 'Non Noo', type: 'LaundryMan', mobileNo: '456121131209', address: 'Cooper St, Arlington', gender: 'Female', last4SSN: '1239' },
  { id: 7, date: '2021-03-13', name: 'Ron Roo', type: 'LaundryMan', mobileNo: '456121141209', address: 'Kerby St, Arlington', gender: 'Female', last4SSN: '1230' },
]

const equipments = [
  { id: 1, date: '2021-01-10', company: 'IFB', modelNo: '121212', type: 'Washing Machine' },
];

const incidents = [
  { id: 1, date: '2021-01-10', customerId: 12, issue: 'torned clothes', status: 'unresolved' },
];

const orders = [
  { id: 1, customerId: '001', employeeId: '001', pickupTime: '12:00', exDeliveryTime: '15:00', type: 'All', paymentMode: 'Cash/Card', paymentStatus: 'Pending', date: '2021-10-10', subTotal: 5, tax: 1, amount: 9 },
  { id: 2, customerId: '001', employeeId: '001', pickupTime: '12:00', exDeliveryTime: '15:00', type: 'Iron', paymentMode: 'Online', paymentStatus: 'Complete', date: '2021-10-11', subTotal: 35, tax: 5, amount: 40 },
  { id: 3, customerId: '002', employeeId: '001', pickupTime: '12:00', exDeliveryTime: '15:00', type: 'Wash', paymentMode: 'Cash/Card', paymentStatus: 'Pending', date: '2021-10-12', subTotal: 8, tax: 2, amount: 10 },
];

export { customers, employees, equipments, orders, users, incidents };
