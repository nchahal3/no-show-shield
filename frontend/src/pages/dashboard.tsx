import { useEffect, useState } from 'react';
import { getDashboardData } from '../utils/api';
import DashboardChart from '../components/DashboardChart';

type Booking = {
  id: number;
  date: string;
  customerName: string;
  // add other fields if needed
};

type RevenueData = {
  labels: string[];
  values: number[];
};

type DashboardData = {
  upcomingBookings: Booking[];
  revenueData: RevenueData;
};

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-6">
        <h2 className="text-xl">Upcoming Bookings</h2>
        <ul>
          {data?.upcomingBookings?.map((booking) => (
            <li key={booking.id} className="border-b py-2">
              {booking.date} - {booking.customerName}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl">Revenue Saved by Deposits</h2>
        <DashboardChart data={data!.revenueData} />
      </div>
    </div>
  );
};

export default Dashboard;
