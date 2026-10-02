### 1. Phân tích nguyên nhân kỹ thuật & Bảng Test Cases

#### Phân tích lỗi mã nguồn

* **Lỗi 1: Sai cơ chế điều phối hàng đợi (LIFO thay vì FIFO)**
* **Dòng lệnh lỗi:** `const nextVehicle = waitingQueue.pop();`
* **Nguyên nhân:** Phương thức `Array.prototype.pop()` loại bỏ và trả về phần tử **cuối cùng** của mảng (`'51K-678.99'`). Trong hệ thống trạm sạc, xe đến trước được đưa vào đầu mảng (chỉ số `0`). Thao tác này biến quy trình thành LIFO (Last In First Out), vi phạm nguyên tắc công bằng FIFO (First In First Out).
* **Giải pháp:** Thay bằng `waitingQueue.shift()` để lấy và xóa phần tử đầu tiên tại chỉ số `0`.
* **Lỗi 2: Lỗi truy cập ngoài biên mảng (Off-by-one Error)**
* **Dòng lệnh lỗi:** `for (let i = 0; i <= completedSessionsKwh.length; i++)`
* **Nguyên nhân:** Mảng có độ dài $N = 4$ có các chỉ số hợp lệ từ `0` đến `3`. Điều kiện `i <= length` khiến vòng lặp chạy thêm bước thứ 5 tại `i = 4`. Biểu thức `completedSessionsKwh[4]` trả về `undefined`. Phép toán số học `totalKwh += undefined` biến `totalKwh` thành `NaN`, kéo theo `totalRevenue` cũng bằng `NaN`.
* **Giải pháp:** Sửa điều kiện dừng thành `i < completedSessionsKwh.length`.

### Bảng Test Cases đối chứng (`README.md`)



| **Trường hợp kiểm thử**                    | **Dữ liệu đầu vào**                                             | **Kết quả sai thực tế**                                                            | **Kết quả đúng mong đợi**                                                        |
| ----------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **TC01: Điều phối xe vào trụ sạc (FIFO)** | `waitingQueue = ['29A-112.33', '30E-889.12', '51K-678.99']`              | Xe được điều phối:`51K-678.99`Hàng đợi còn lại:`['29A-112.33', '30E-889.12']` | Xe được điều phối:`29A-112.33`Hàng đợi còn lại:`['30E-889.12', '51K-678.99']` |
| **TC02: Tính tổng sản lượng & doanh thu**  | `completedSessionsKwh = [45.2, 30.5, 62.8, 28.0]fastChargingRate = 4500` | Tổng sản lượng:`NaN kWh`Tổng doanh thu:`NaN VNĐ`                                   | Tổng sản lượng:`166.5 kWh`Tổng doanh thu:`749250 VNĐ`                              |
