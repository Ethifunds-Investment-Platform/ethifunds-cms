/**
 * Turns blob into base64
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
 * generates a preview string from base64 use in conjunction with blobReader
 */
export function generatePreview(base64String: string, fileType: string) {
	const _preview = `data:${fileType};base64,${base64String}`;

	return _preview;
}

