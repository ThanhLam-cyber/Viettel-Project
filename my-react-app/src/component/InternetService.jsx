function InternetService({ data, onItemClick }) {
  return (
    <div>
      <h2>Dịch vụ Internet</h2>
      {data.map((item) => (
        <div
          key={item.name}
          className="p-4 border cursor-pointer hover:bg-gray-100"
          onClick={() => onItemClick("internet", item.name)} // Điều hướng sử dụng tên gói làm ID
        >
          <h3>{item.name}</h3>
          <p>Độ rộng băng thông: {item.bandwidth}</p>
          <p>Giá: {item.ftth.toLocaleString()} VNĐ</p>
        </div>
      ))}
    </div>
  );
}

export default InternetService;