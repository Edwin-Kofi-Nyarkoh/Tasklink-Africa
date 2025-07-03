import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
}

export async function uploadImage(
  file: File | Buffer | string,
  options: {
    folder?: string
    transformation?: any
    public_id?: string
  } = {},
): Promise<UploadResult> {
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder: options.folder || "tasklink",
      transformation: options.transformation,
      public_id: options.public_id,
      resource_type: "auto",
    })

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error("Cloudinary delete error:", error)
    throw new Error("Failed to delete image")
  }
}

export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
    crop?: string
  } = {},
): string {
  return cloudinary.url(publicId, {
    width: options.width,
    height: options.height,
    quality: options.quality || "auto",
    format: options.format || "auto",
    crop: options.crop || "fill",
    fetch_format: "auto",
  })
}
