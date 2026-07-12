const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-[#181818] rounded-xl p-6 shadow-lg border border-[#282828] hover:border-green-500 transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {value}
          </h2>

        </div>

        <div className="text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
};

export default StatCard;