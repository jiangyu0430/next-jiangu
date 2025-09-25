import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params
  try {
    const filePath = path.join(process.cwd(), 'data', 'content', `${slug}.md`)
    const content = fs.readFileSync(filePath, 'utf-8')
    return NextResponse.json({ content })
  } catch (err) {
    return NextResponse.json({ content: null }, { status: 404 })
  }
}
