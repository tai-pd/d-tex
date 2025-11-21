# Payload CMS API Documentation

Tài liệu này mô tả các API RESTful có sẵn trong hệ thống Payload CMS của dự án D-Tex.

## 1. Tổng quan

- **Base URL**: `https://<your-domain>/api`
- **Format**: JSON
- **Pagination**: Mặc định trả về đối tượng phân trang (`docs`, `totalDocs`, `limit`, `totalPages`, `page`, ...).

## 2. Authentication (Xác thực)

Hầu hết các API `GET` (đọc dữ liệu) cho nội dung trang web (Sản phẩm, Bài viết, Trang...) đều là **Public** (không cần đăng nhập).

Các thao tác `POST`, `PATCH`, `DELETE` (trừ `contacts`) yêu cầu xác thực.

### Đăng nhập (Login)

**Endpoint**: `POST /api/users/login`

**Body**:

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response**: Trả về cookie hoặc token để sử dụng cho các request tiếp theo.

---

## 3. Các Collection API (Public)

Dưới đây là các API thường dùng cho Client (Frontend).

### 3.1. Sản phẩm (Products)

**Endpoint**: `GET /api/products`

**Các trường chính**: `title`, `slug`, `sku`, `brand`, `category`, `price`, `images`, `specs`, `description`, `relatedProducts`.

**Ví dụ sử dụng**:

- **Lấy danh sách sản phẩm (phân trang)**:

  ```http
  GET /api/products?page=1&limit=10
  ```

- **Lấy chi tiết sản phẩm theo Slug**:

  ```http
  GET /api/products?where[slug][equals]=ten-san-pham
  ```

- **Lọc theo Danh mục (Category)**:

  ```http
  GET /api/products?where[category.slug][equals]=thiet-bi-dien
  ```

- **Lọc theo Thương hiệu (Brand)**:

  ```http
  GET /api/products?where[brand.slug][equals]=ls
  ```

- **Tìm kiếm theo tên**:
  ```http
  GET /api/products?where[title][like]=mcb
  ```

### 3.2. Dòng sản phẩm (Categories)

**Endpoint**: `GET /api/categories`

**Các trường chính**: `name`, `slug`, `parent`, `image`, `description`.

**Ví dụ sử dụng**:

- **Lấy tất cả danh mục**:

  ```http
  GET /api/categories?limit=100&sort=order
  ```

- **Lấy danh mục con của một danh mục cha**:

  ```http
  GET /api/categories?where[parent.slug][equals]=danh-muc-cha
  ```

- **Lấy danh mục theo bộ sưu tập (Serial)**:

  Cách 1 - Lấy serial với categories đã populate:

  ```http
  GET /api/serials?where[slug][equals]=thiet-bi-dong-cat&depth=1
  ```

  Cách 2 - Lọc categories theo ID của serial (nếu biết ID):

  ```http
  GET /api/categories?where[id][in]=id1,id2,id3
  ```

### 3.3. Thương hiệu (Brands)

**Endpoint**: `GET /api/brands`

**Các trường chính**: `name`, `slug`, `logo`, `website`, `country`.

**Ví dụ sử dụng**:

```http
GET /api/brands?sort=name
```

### 3.4. Bộ sưu tập (Serials)

**Endpoint**: `GET /api/serials`

**Các trường chính**: `name`, `slug`, `categories`, `description`.

**Ví dụ sử dụng**:

- **Lấy danh sách bộ sưu tập và các danh mục con**:

  ```http
  GET /api/serials?depth=1
  ```

- **Lấy chi tiết bộ sưu tập theo slug**:
  ```http
  GET /api/serials?where[slug][equals]=thiet-bi-dong-cat
  ```

### 3.5. Bài viết (Posts)

**Endpoint**: `GET /api/posts`

Chỉ trả về các bài viết có `published: true`.

**Các trường chính**: `title`, `slug`, `excerpt`, `featuredImage`, `content`, `author`, `publishedAt`.

**Ví dụ sử dụng**:

- **Lấy danh sách bài viết mới nhất**:

  ```http
  GET /api/posts?sort=-publishedAt&limit=5
  ```

- **Lấy chi tiết bài viết**:
  ```http
  GET /api/posts?where[slug][equals]=tieu-de-bai-viet
  ```

### 3.6. Trang (Pages)

**Endpoint**: `GET /api/pages`

Dùng để render các trang động (Trang chủ, Giới thiệu, ...).

**Các trường chính**: `title`, `slug`, `layout`, `hero`, `sections` (blocks), `seo`.

**Ví dụ sử dụng**:

- **Lấy dữ liệu Trang chủ**:

  ```http
  GET /api/pages?where[slug][equals]=home
  ```

- **Lấy dữ liệu trang Giới thiệu**:
  ```http
  GET /api/pages?where[slug][equals]=about
  ```

### 3.7. Footer

**Endpoint**: `GET /api/footers`

Lấy cấu hình footer (địa chỉ, mạng xã hội, link...).

**Ví dụ sử dụng**:

```http
GET /api/footers?where[isActive][equals]=true&limit=1
```

### 3.8. Media (Hình ảnh/Tài liệu)

**Endpoint**: `GET /api/media`

**Ví dụ sử dụng**:

```http
GET /api/media/:id
```

(Thường URL ảnh sẽ được trả về trực tiếp trong các field của Product/Post/Page).

---

## 4. Form Submission API

### 4.1. Gửi liên hệ (Contacts)

**Endpoint**: `POST /api/contacts`

API này là **Public**, cho phép khách hàng gửi form liên hệ.

**Body**:

```json
{
  "name": "Nguyễn Văn A",
  "email": "khachhang@example.com",
  "phone": "0901234567",
  "company": "Công ty ABC",
  "message": "Tôi cần tư vấn về sản phẩm...",
  "product": "id-san-pham-quan-tam" // (Optional) ID của sản phẩm nếu quan tâm cụ thể
}
```

**Response (Success)**:

```json
{
  "message": "Contact submitted successfully",
  "doc": { ... }
}
```

---

## 5. Query Parameters (Tham số truy vấn)

Payload CMS hỗ trợ các tham số mạnh mẽ để lọc và format dữ liệu:

- **`depth`**: Độ sâu của relationship.

  - `depth=0`: Chỉ trả về ID của relationship.
  - `depth=1` (default): Populate 1 cấp relationship.
  - `depth=2`: Populate 2 cấp.
  - Ví dụ: `GET /api/products?depth=2` để lấy cả thông tin chi tiết của Brand và Category.

- **`limit`**: Số lượng bản ghi trên 1 trang (Mặc định 10).

  - Ví dụ: `?limit=50`

- **`page`**: Trang số mấy.

  - Ví dụ: `?page=2`

- **`sort`**: Sắp xếp.

  - `sort=field`: Tăng dần.
  - `sort=-field`: Giảm dần.
  - Ví dụ: `?sort=-createdAt` (Mới nhất trước).

- **`where`**: Lọc dữ liệu (Querying).
  - `equals`: Bằng. `?where[slug][equals]=abc`
  - `not_equals`: Khác.
  - `greater_than`: Lớn hơn.
  - `less_than`: Nhỏ hơn.
  - `like`: Tìm kiếm gần đúng (cho text). `?where[title][like]=abc`
  - `in`: Nằm trong danh sách. `?where[category][in][0]=id1&where[category][in][1]=id2`
  - `exists`: Kiểm tra tồn tại. `?where[image][exists]=true`

## 6. Ví dụ tích hợp Frontend (Fetch)

```javascript
// Lấy danh sách sản phẩm
async function getProducts() {
  const res = await fetch("https://api.dtech.vn/api/products?limit=12");
  const data = await res.json();
  return data.docs;
}

// Gửi form liên hệ
async function submitContact(formData) {
  const res = await fetch("https://api.dtech.vn/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  return await res.json();
}
```
