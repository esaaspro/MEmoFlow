import { createClient } from "./client";

/**
 * Upload an audio file to Supabase Storage
 * @param file - Audio blob to upload
 * @param userId - User ID for folder organization
 * @returns Public URL of the uploaded file
 */
export async function uploadAudioToStorage(
  file: Blob,
  userId: string
): Promise<string> {
  const supabase = createClient();

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `${userId}/${timestamp}.webm`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from("recordings")
    .upload(filename, file, {
      contentType: file.type || "audio/webm",
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw new Error(`Failed to upload audio: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from("recordings")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

/**
 * Delete an audio file from Supabase Storage
 * @param path - File path in storage
 */
export async function deleteAudioFromStorage(path: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.storage.from("recordings").remove([path]);

  if (error) {
    console.error("Storage delete error:", error);
    throw new Error(`Failed to delete audio: ${error.message}`);
  }
}

