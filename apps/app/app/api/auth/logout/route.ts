import { NextResponse } from 'next/server';

export async function POST() {
  // 在实际项目中，这里可以将 token 加入黑名单
  return NextResponse.json({ message: '登出成功' });
}