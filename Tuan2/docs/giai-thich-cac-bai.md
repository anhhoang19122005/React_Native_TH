# Hướng dẫn thực hiện các bài tập Asynchronous TypeScript

## Phần A: Basics with Promise

### Bài 1
1. Tạo một `Promise<string>`.
2. Dùng `setTimeout` với thời gian 2 giây.
3. Gọi `resolve("Hello Async")` bên trong `setTimeout`.
4. Dùng `.then()` để nhận và in kết quả.

### Bài 2
1. Tạo một Promise kiểu `number`.
2. Dùng `setTimeout` với thời gian 1 giây.
3. Gọi `resolve(10)` sau khi hết thời gian chờ.
4. Dùng `.then()` để in số 10.

### Bài 3
1. Tạo một Promise có cả `resolve` và `reject`.
2. Dùng `setTimeout` với thời gian 1 giây.
3. Gọi `reject(new Error("Something went wrong"))`.
4. Dùng `.catch()` để lấy và in thông báo lỗi.

### Bài 4
1. Viết hàm trả về `Promise<number>`.
2. Tạo một số ngẫu nhiên bằng `Math.random()`.
3. Nếu số lớn hơn hoặc bằng `0.5`, gọi `resolve(randomNumber)`.
4. Nếu số nhỏ hơn `0.5`, gọi `reject(new Error(...))`.
5. Gọi hàm bằng `.then()` để in kết quả và `.catch()` để in lỗi.

### Bài 5
1. Viết hàm `simulateTask(time)` trả về `Promise<string>`.
2. Dùng `setTimeout` với giá trị `time` truyền vào.
3. Gọi `resolve("Task done")` sau khi hết thời gian chờ.
4. Gọi hàm với thời gian cụ thể và dùng `.then()` để in kết quả.

### Bài 6
1. Tạo hàm `simulateTask(time)` để mô phỏng một công việc.
2. Khởi tạo ba Promise với ba thời gian khác nhau.
3. Đưa ba Promise vào `Promise.all()` để chạy cùng lúc.
4. Dùng `.then()` để nhận mảng kết quả sau khi cả ba hoàn thành.
5. In mảng kết quả và dùng `.catch()` để xử lý lỗi.

### Bài 7
1. Tạo nhiều Promise mô phỏng các công việc có thời gian khác nhau.
2. Đưa các Promise vào `Promise.race()`.
3. Dùng `.then()` để lấy kết quả của Promise hoàn thành đầu tiên.
4. Dùng `.catch()` để xử lý lỗi nếu Promise bị từ chối.

### Bài 8
1. Bắt đầu bằng `Promise.resolve(2)`.
2. Dùng `.then()` thứ nhất để tính `2 ** 2`.
3. Dùng `.then()` tiếp theo để nhân kết quả với 2.
4. Dùng `.then()` tiếp theo để cộng 5.
5. In kết quả ở `.then()` cuối cùng.

### Bài 9
1. Khai báo mảng số từ 1 đến 10.
2. Tạo một Promise đã hoàn thành bằng `Promise.resolve()`.
3. Dùng `setTimeout` để chờ 1 giây.
4. Dùng `filter()` với điều kiện `value % 2 === 0`.
5. In mảng số chẵn trong callback của `setTimeout`.

### Bài 10
1. Tạo một Promise thực hiện thao tác lọc mảng.
2. Dùng `filter()` để lấy các số chẵn.
3. In kết quả trong `.then()` hoặc callback xử lý thành công.
4. Thêm `.finally(() => console.log("Done"))` để luôn in “Done” khi Promise kết thúc.

## Phần B: Async/Await

### Bài 11
1. Tạo hàm `helloAsync()` trả về Promise chứa chuỗi.
2. Dùng `setTimeout` 2 giây rồi gọi `resolve("Hello Async")`.
3. Tạo hàm `async main()`.
4. Dùng `await helloAsync()` để lấy kết quả.
5. Dùng `console.log()` để in kết quả.

### Bài 12
1. Tạo hàm `simulateTask(time)` trả về Promise.
2. Tạo hàm `async callSimulateTask()`.
3. Gọi `await simulateTask(2000)` và lưu kết quả.
4. In kết quả sau khi Promise hoàn thành.

### Bài 13
1. Tạo hàm bất đồng bộ có thể trả về kết quả hoặc phát sinh lỗi.
2. Đặt lệnh `await` trong khối `try`.
3. In kết quả nếu Promise hoàn thành.
4. Dùng `catch` để bắt và in lỗi khi Promise bị từ chối.

### Bài 14
1. Viết hàm `multiplyByThree(num)` trả về `Promise<number>`.
2. Dùng `setTimeout` để chờ 1 giây.
3. Gọi `resolve(num * 3)` sau thời gian chờ.
4. Dùng `await multiplyByThree(3)` trong hàm `async`.
5. In kết quả bằng `console.log()`.

### Bài 15
1. Viết hàm `simulateTask(name, time)` trả về Promise.
2. Gọi `await` cho Task 1 và in kết quả.
3. Sau khi Task 1 xong, gọi `await` cho Task 2 và in kết quả.
4. Lặp lại với Task 3.
5. Giữ các lệnh `await` nối tiếp để mỗi task bắt đầu sau task trước.

### Bài 16
1. Tạo ba Promise bằng hàm mô phỏng task.
2. Gọi cả ba hàm trước khi dùng `await` để chúng bắt đầu song song.
3. Đưa ba Promise vào `Promise.all()`.
4. Dùng `await` để chờ toàn bộ kết quả.
5. Duyệt mảng kết quả và in từng task.

### Bài 17
1. Tạo một mảng gồm nhiều Promise.
2. Bắt đầu các Promise cùng lúc khi tạo mảng.
3. Dùng vòng lặp `for await...of` để lấy từng kết quả.
4. In kết quả trong mỗi vòng lặp.
5. Kết quả được lấy theo thứ tự các Promise trong mảng.

### Bài 18
1. Khai báo kiểu `User` gồm `id`, `name` và `email`.
2. Viết hàm `fetchUser(id)` trả về `Promise<User>`.
3. Dùng `setTimeout` 1 giây để mô phỏng API.
4. Gọi `resolve()` với đối tượng người dùng.
5. Dùng `await fetchUser(1)` và in đối tượng nhận được.

### Bài 19
1. Tái sử dụng hàm `fetchUser(id)`.
2. Viết hàm `fetchUsers(ids)` nhận mảng ID.
3. Dùng `ids.map()` để tạo một Promise cho từng ID.
4. Dùng `Promise.all()` để chờ toàn bộ người dùng.
5. Trả về mảng người dùng và in kết quả.

### Bài 20
1. Viết hàm `withTimeout(promise, timeoutMs)` nhận Promise và thời gian tối đa.
2. Tạo một bộ đếm bằng `setTimeout` để gọi `reject` khi quá thời gian.
3. Khi Promise hoàn thành, dùng `clearTimeout()` và gọi `resolve`.
4. Khi Promise lỗi, xóa bộ đếm rồi gọi `reject`.
5. Bọc lời gọi API bằng `withTimeout(..., 2000)` và bắt lỗi timeout bằng `try/catch`.

## Phần C: Fetch API và Simulated I/O

### Bài 21
1. Gọi `fetch()` với URL của API todo.
2. Kiểm tra `response.ok` sau khi nhận response.
3. Gọi `response.json()` để đọc dữ liệu.
4. Ép kiểu dữ liệu về kiểu `Todo`.
5. In todo và dùng `catch()` để xử lý lỗi request.

### Bài 22
1. Viết hàm nhận ID và gọi API todo tương ứng.
2. Tạo mảng ID cần lấy.
3. Dùng `map()` để tạo nhiều Promise fetch.
4. Dùng `Promise.all()` để chờ các request cùng lúc.
5. Duyệt mảng kết quả và in từng todo.

### Bài 23
1. Gọi API lấy toàn bộ danh sách todo.
2. Kiểm tra response trước khi đọc dữ liệu.
3. Chuyển response sang mảng `Todo` bằng `response.json()`.
4. Dùng `filter((todo) => todo.completed)` để giữ các todo đã hoàn thành.
5. Trả về và in mảng sau khi lọc.

### Bài 24
1. Gọi `fetch()` với URL tạo post.
2. Đặt `method` là `POST`.
3. Thêm header `Content-Type: application/json`.
4. Dùng `JSON.stringify()` để chuyển dữ liệu gửi đi thành chuỗi JSON.
5. Kiểm tra response, đọc JSON trả về và in post mới.

### Bài 25
1. Viết hàm `downloadFile(fileName)` trả về Promise.
2. Dùng `setTimeout` với thời gian 3 giây.
3. Gọi `resolve()` với thông báo tải file thành công.
4. Dùng `await downloadFile(...)` trong hàm `async`.
5. In thông báo bắt đầu và kết thúc tải file.

### Bài 26
1. Viết hàm `wait(milliseconds)` trả về Promise<void>.
2. Gọi `resolve` bên trong `setTimeout`.
3. In thông báo bắt đầu chờ.
4. Dùng `await wait(5000)` để chờ 5 giây.
5. In thông báo sau khi thời gian chờ kết thúc.

### Bài 27
1. Viết hàm `fetchWithRetry(url, retries)`.
2. Dùng vòng lặp cho lần gọi đầu tiên và các lần thử lại.
3. Gọi `fetch()` và ném lỗi nếu response không thành công.
4. Lưu lỗi, in thông báo rồi tiếp tục thử khi số lần retry chưa hết.
5. Trả về JSON nếu thành công hoặc ném lỗi cuối cùng sau toàn bộ lần thử.

### Bài 28
1. Viết hàm xử lý một task và trả về Promise.
2. Tạo năm Promise bằng `map()`.
3. Đưa toàn bộ Promise vào `Promise.all()`.
4. Dùng `await` để chờ batch hoàn thành.
5. Duyệt mảng kết quả và in từng task.

### Bài 29
1. Tạo một mảng task theo thứ tự cần xử lý.
2. Dùng vòng lặp `for...of` để duyệt hàng đợi.
3. Gọi `await` cho task hiện tại.
4. In kết quả sau khi task hiện tại hoàn thành.
5. Chuyển sang task tiếp theo sau mỗi lần `await`.

### Bài 30
1. Tạo mảng URL gồm các request hợp lệ và một request lỗi.
2. Dùng `map()` để tạo Promise fetch cho từng URL.
3. Đưa các Promise vào `Promise.allSettled()`.
4. Duyệt kết quả và kiểm tra `status` là `fulfilled` hay `rejected`.
5. In dữ liệu với request thành công và in lỗi với request thất bại.
