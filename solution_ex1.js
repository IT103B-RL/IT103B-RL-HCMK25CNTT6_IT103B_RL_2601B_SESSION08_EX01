// Đơn giá sạc nhanh (VNĐ/kWh)
const fastChargingRate = 4500;

// Hàng đợi xe chờ sạc (xe đến sớm nhất ở vị trí index 0)
const waitingQueue = ['29A-112.33', '30E-889.12', '51K-678.99'];

// SỬA LỖI 1: Dùng shift() để lấy phần tử đầu mảng theo đúng cơ chế FIFO
const nextVehicle = waitingQueue.shift();
console.log('Xe được điều phối vào sạc:', nextVehicle);

// Danh sách điện năng tiêu thụ các phiên đã hoàn tất (kWh)
const completedSessionsKwh = [45.2, 30.5, 62.8, 28.0];
let totalKwh = 0;

// SỬA LỖI 2: Đổi điều kiện 'i <= length' thành 'i < length' để tránh truy cập undefined
for (let i = 0; i < completedSessionsKwh.length; i++) {
  totalKwh += completedSessionsKwh[i];
}

// Tính toán tổng doanh thu
const totalRevenue = totalKwh * fastChargingRate;

console.log('Tổng sản lượng:', totalKwh, 'kWh');
console.log('Tổng doanh thu:', totalRevenue, 'VNĐ');