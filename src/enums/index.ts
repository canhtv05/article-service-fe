export enum Viewport {
  'SM' = 640,
  'MD' = 768,
  'LG' = 1024,
  'XL' = 1280,
  '2XL' = 1536,
}

export enum Status {
  ALL = 'ALL',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Notice {
  ADD_SUCCESS = 'Thêm thành công',
  ADD_FAILED = 'Thêm thất bại',
  REMOVE_SUCCESS = 'Xóa thành công',
  REMOVE_FAILED = 'Xóa thất bại',
  UPDATE_SUCCESS = 'Cập nhật thành công',
  UPDATE_FAILED = 'Cập nhật thất bại',
}

export enum Assignment {
  NOT_ASSIGNED = 'Chưa phân công',
  ASSIGNED = 'Đã phân công',
}

export enum StatusSend {
  SENT = 'Đã gửi cho PR',
  NOT_SENT = 'Chưa gửi cho PR',
  ALL = 'Tất cả',
}

export enum StatusRegistration {
  OPEN = 'Mở đăng ký',
  CLOSE = 'Đóng đăng ký',
}

export enum StatusApproveArticle {
  PENDING = 'Chờ phê duyệt',
}

export enum StatusArchiveAndHistory {
  APPROVED = 'Đã phê duyệt',
  NOT_APPROVED = 'Chưa phê duyệt',
}

export enum StatusArticle {
  POSTED = 'Đã đăng',
  PENDING = 'Chưa đăng',
  NOT_POSTED = 'Không đăng',
}
