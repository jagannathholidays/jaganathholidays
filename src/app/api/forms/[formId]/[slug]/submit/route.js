import { NextResponse } from 'next/server';

export async function POST(request, { params }) {
  try {
    const { formId, slug } = await params;
    const body = await request.json();

    const baseUrl = process.env.CMS_API_URL || 'https://cmsapi.one9ty.com';
    const targetUrl = `${baseUrl.replace(/\/+$/, '')}/api/v1/public/forms/${formId}/${slug}/submit`;

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    if (process.env.CMS_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.CMS_TOKEN}`;
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error: data?.message || `CMS API error with status: ${response.status}`,
          details: data?.errors || null,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: data?.message || 'Form submitted successfully',
      submission_no: data?.submission_no || data?.submission?.submission_no || null,
      data: data,
    });
  } catch (error) {
    console.error('Error proxying form submission:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error occurred' },
      { status: 500 }
    );
  }
}
