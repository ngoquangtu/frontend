import React from 'react';

function ResetPasswordPage() {
  return (
    <main>
      <h1>Đặt lại mật khẩu</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <button type="submit">Gửi</button>
      </form>
    </main>
  );
}

export default ResetPasswordPage;
