export default function AdminHeader({ residentsCount, employeesCount, activeToday = 97 }) {
  return (
    <div className="bg-linear-to-r from-blue-700 to-indigo-700 text-white px-5 sm:px-8 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm sm:text-base text-blue-100">
            Compound Management System
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs text-blue-100">Residents</p>

            <h3 className="mt-1 text-xl font-bold">{residentsCount}</h3>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs text-blue-100">Employees</p>

            <h3 className="mt-1 text-xl font-bold">{employeesCount}</h3>
          </div>

          <div className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur">
            <p className="text-xs text-blue-100">Today</p>

            <h3 className="mt-1 text-xl font-bold">{activeToday}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
