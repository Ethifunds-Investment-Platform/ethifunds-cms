/**
 * Converts a Blob (such as a File) to a base64-encoded data URL string.
 *
 * @param data - The Blob or File to convert.
 * @returns A Promise that resolves to a base64-encoded data URL string representing the file contents.
 * @throws If the file cannot be read.
 *
 * @example
 * const base64 = await blobReader(file);
 * // base64 => "data:image/png;base64,iVBORw0KGgo..."
 */
export default async function blobReader(data: Blob): Promise<string> {
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      // const base64data = (reader.result as any).split(',')[1];
      const base64data = reader.result as string;
      if (base64data) resolve(base64data);
      else reject(new Error("error getting file"));
    }
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(data);
  })
}


/**
 * Generates a preview data URL string from a base64 string and file type.
 *
 * @param base64String - The base64 string (with or without data URL prefix).
 * @param fileType - The MIME type of the file (e.g., 'image/png').
 * @returns A data URL string suitable for use as an image src or file preview.
 *
 * @example
 * const preview = generatePreview(base64, 'image/png');
 * // preview => "data:image/png;base64,iVBORw0KGgo..."
 */
export function generatePreview(base64String: string, fileType: string) {
	if (base64String.includes("data:")) return base64String;
	const _preview = `data:${fileType};base64,${base64String}`;

	return _preview;
}

/**
 * Compresses an image file using the Canvas API, optionally resizing it and adjusting quality/type.
 *
 * @param file - The image File to compress.
 * @param options - Optional settings:
 *   - quality: Compression quality (0 to 1, only for lossy formats like JPEG/WebP; default is 1).
 *   - type: Output MIME type (e.g., 'image/jpeg', 'image/png'; default is the original file type).
 *   - maxWidth: Optional maximum width for resizing (maintains aspect ratio).
 *   - maxHeight: Optional maximum height for resizing (maintains aspect ratio).
 * @returns A Promise that resolves to a new compressed File.
 * @throws If the file is not a supported image or compression fails.
 *
 * @note This function only works for image files (e.g., JPEG, PNG, WebP). It does not support document files (e.g., PDF, DOCX).
 *
 * @example
 * const compressed = await compressImage(file, { quality: 0.7, type: 'image/jpeg', maxWidth: 800 });
 */
export const compressImage = async (
	file: File,
	{
		quality = 1,
		type = file.type,
		maxWidth,
		maxHeight,
	}: { quality?: number; type?: string; maxWidth?: number; maxHeight?: number } = {}
): Promise<File> => {
	const imageBitmap = await createImageBitmap(file);

	// Optionally scale down
	let width = imageBitmap.width;
	let height = imageBitmap.height;
	if (maxWidth && width > maxWidth) {
		height = (maxWidth / width) * height;
		width = maxWidth;
	}
	if (maxHeight && height > maxHeight) {
		width = (maxHeight / height) * width;
		height = maxHeight;
	}

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Canvas rendering context is not available.");

	ctx.drawImage(imageBitmap, 0, 0, width, height);

	const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
	if (!blob) throw new Error("Failed to create Blob from canvas.");

	

	return new File([blob], file.name, { type: blob.type });
};

