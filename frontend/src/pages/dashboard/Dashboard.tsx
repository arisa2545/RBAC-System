const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col gap-4">
        <p className="text-5xl font-extrabold">Welcome, Arisa A.</p>
        <div className="flex gap-4">
          <div className="border w-fit rounded-xl p-6 text-center">
            <p>Total User</p>
            <p className="font-bold text-2xl">10</p>
          </div>
          <div className="border w-fit rounded-xl p-6 text-center">
            <p>Total Role</p>
            <p className="font-bold text-2xl">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
