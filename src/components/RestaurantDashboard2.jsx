import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';

const RestaurantDashboard2 = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    // Fetch orders based on activeTab (pending/completed/canceled)
    const fetchOrders = async () => {
      const response = await fetch(`/orders?status=${activeTab}`);
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, [activeTab]);

  const handleComplete = (orderId) => {
    // Handle marking order as completed
  };

  const handleCancel = (orderId) => {
    // Handle canceling the order
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
        <Tab value="pending" label="Pending" />
        <Tab value="completed" label="Completed" />
        <Tab value="canceled" label="Canceled" />
      </Tabs>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order #</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Time Placed</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user_name}</TableCell>
              <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
              <TableCell>${order.total_price}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {order.status === 'pending' && (
                  <>
                    <Button onClick={() => handleComplete(order.id)}>Complete</Button>
                    <Button onClick={() => handleCancel(order.id)}>Cancel</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RestaurantDashboard2;
